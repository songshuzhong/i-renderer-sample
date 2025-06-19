<template>
  <div
      :class="['i-table-td-selector']"
      :style="{
      top: shape.top,
      left: shape.left,
      width: shape.width,
      height: shape.height
    }"
  ></div>
</template>
<script>
import {defineComponent, getCurrentInstance, onMounted, onBeforeUnmount, ref, reactive, nextTick} from 'vue';
export default defineComponent({
  name: 'Tdpicker',
  props: {
    initData: Object,
    action: Function,
    linkedOn: {
      type: String,
      required: false,
      default: ''
    },
    target: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup(props) {
    const {proxy} = getCurrentInstance();
    const iModelValue = ref({});
    const shape = reactive({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    });
    const status = {
      '1': '浮动列禁止合并',
      '2': '合并前请拆分单元格'
    };
    const point = {};
    let isDragging = ref(false);
    let table;
    let tableBody;
    let rowKey;
    let selectedCells = false;
    const completeTable = (cells, rowLength, colLength) => {
      const result = new Array(rowLength);
      for (let i = 0; i < rowLength; i++) {
        result[i] = new Array(colLength).fill(0);
      }
      let countCol = 0;
      let countRow = 0;
      for (let i = 0; i < cells.length; i++) {
        let bothMerged = false;
        let cell = cells[i];
        const rowSpan = parseInt(cell.getAttribute('rowspan') || 1, 10);
        const colSpan = parseInt(cell.getAttribute('colspan') || 1, 10);
        while (result[countRow] && result[countRow][countCol] == null) {
          countCol++;
        }
        result[countRow][countCol] = cell;
        countCol++;
        if (colSpan > 1 && rowSpan > 1) {
          bothMerged = true;
          countCol--;
          for (let j = 0; j < colSpan; j++) {
            for (let i = 0; i < rowSpan; i++) {
              result[countRow + i][countCol] = null;
            }
            countCol++;
          }
        }
        if (colSpan > 1 && !bothMerged) {
          for (let col = 1; col < colSpan; col++) {
            result[countRow][countCol] = null;
            countCol++;
          }
        }
        let currentColumnIndex = countCol % colLength;
        if (countCol % colLength === 0 && countCol > 1) {
          countRow++;
          countCol = 0;
        }
        if (rowSpan > 1 && !bothMerged) {
          for (let i = 1; i < rowSpan; i++) {
            result[countRow + i][currentColumnIndex] = null;
          }
        }
      }
      return result;
    };
    const clearActiveCells = () => {
      const cells = table.$el.querySelectorAll('.el-table__cell');
      cells.forEach((cell) => {
        cell.classList.remove('half-border-top');
        cell.classList.remove('half-border-left');
        cell.classList.remove('half-border-bottom');
        cell.classList.remove('half-border-right');
        cell.classList.remove('active-cell');
      });
    };
    const isCovered = (rect, element) =>  {
      const elemRect = element.getBoundingClientRect();
      const elemCenterX = elemRect.left + elemRect.width / 2;
      const elemCenterY = elemRect.top + elemRect.height / 2;
      return rect.x1 <= elemCenterX && elemCenterX <= rect.x2 && rect.y1 <= elemCenterY && elemCenterY <= rect.y2;
    }
    const getRectangleFromEvents = (rect) => {
      const left = Math.min(rect.x1, rect.x2);
      const top = Math.min(rect.y1, rect.y2);
      const right = Math.max(rect.x1, rect.x2);
      const bottom = Math.max(rect.y1, rect.y2);
      return {left, top, right, bottom};
    };
    const isUnder = (rect, ele) => {
      const el = ele.getBoundingClientRect();
      // 元素在矩形右下方
      const isOverlap1 = el.top > rect.top && el.top < rect.bottom && el.left > rect.left && el.left < rect.right;
      // 元素在矩形左下方
      const isOverlap2 = el.top > rect.top && el.top < rect.bottom && el.right > rect.left && el.right < rect.right;
      // 元素在矩形左上方
      const isOverlap3 = el.bottom > rect.top && el.bottom < rect.bottom && el.right > rect.left && el.right < rect.right;
      // 元素在矩形右上方
      const isOverlap4 = el.bottom > rect.top && el.bottom < rect.bottom && el.left > rect.left && el.left < rect.right;
      // 元素横穿矩形
      const isOverlap5 = el.top >= rect.top && el.bottom <= rect.bottom && el.left <= rect.left && el.right >= rect.right;

      return isOverlap1 || isOverlap2 || isOverlap3 || isOverlap4 || isOverlap5;
    };
    const onMouseDown = (event) => {
      isDragging.value = true;
      point.startX = event.clientX;
      point.startY = event.clientY;
      shape.left = `${point.startX}px`;
      shape.top = `${point.startY}px`;
      shape.width = '0px';
      shape.height = '0px';
      clearActiveCells();
    };
    const onMouseMove = (event) => {
      if (!isDragging.value) return;
      const currentX = event.clientX;
      const currentY = event.clientY;
      const width = Math.abs(currentX - point.startX);
      const height = Math.abs(currentY - point.startY);
      point.width = width;
      point.height = height;
      shape.width = `${width}px`;
      shape.height = `${height}px`;
      if (currentX < point.startX) shape.left = `${currentX}px`;
      if (currentY < point.startY) shape.top = `${currentY}px`;
    };
    const onMouseUp = (event) => {
      isDragging.value = false;
      shape.left = `-100px`;
      shape.top = `-100px`;
      shape.width = '0px';
      shape.height = '0px';

      const x = event.clientX;
      const y = event.clientY;
      const minX = Math.min(x, point.startX);
      const maxX = Math.max(x, point.startX);
      const minY = Math.min(y, point.startY);
      const maxY = Math.max(y, point.startY);
      const rect = {
        x1: minX,
        x2: maxX,
        y1: minY,
        y2: maxY,
      };
      const rows = table.rows;
      const flatColumn = table.flatColumn;
      const activeCellMap = new WeakMap();
      let cells = tableBody.querySelectorAll('.el-table__cell');
      let activeCells = [];
      let hasSpecialColumn = '';
      cells = completeTable(cells, rows.length, flatColumn.length);
      const rect1 = getRectangleFromEvents(rect);
      for (let i = 0; i < cells.length; i++) {
        let rowIndex = i;
        for (let j = 0; j < cells[i].length; j++) {
          let columnIndex = j;
          let cell = cells[i][j];
          if (!cell) {
            let j1 = j - 1;
            let cell1 = cells[i][j1];
            if (cell1 && isUnder(rect1, cell1)) {
              hasSpecialColumn = '2';
            }
          }
          if (cell && isCovered(rect, cell)) {
            const columnProp = flatColumn[columnIndex].name;
            const tdValue = rows[rowIndex][columnProp] || '';
            if ('left,right'.includes(flatColumn[columnIndex].fixed)) {
              hasSpecialColumn = '1';
            }
            if (!iModelValue.value[props.name][rowIndex]) {
              iModelValue.value[props.name][rowIndex] = [];
            }
            iModelValue.value[props.name][rowIndex].push({
              [columnProp]: tdValue,
              [rowKey]: rows[rowIndex][rowKey]
            });
            selectedCells = true;
            activeCells.push(cell);
            cell.classList.add('active-cell');
            activeCellMap.set(cell, {rowIndex, columnIndex, columnProp});
          }
        }
      }
      if (hasSpecialColumn) {
        proxy.$message({
          message: status[hasSpecialColumn],
          grouping: true,
          showClose: true,
          type: 'error',
        });
        iModelValue.value[props.name] = {};
        return clearActiveCells();
      }
      const totalRows = Object.keys(iModelValue.value[props.name]).length;
      const totalColumns = activeCells.length / totalRows;
      activeCells.forEach((cell, index) => {
        if (index < totalColumns) {
          cell.classList.add('half-border-top');
        }
        if (index >= (totalRows - 1) * totalColumns) {
          cell.classList.add('half-border-bottom');
        }
        if (Number.isInteger(index / totalColumns)) {
          cell.classList.add('half-border-left');
        }
        if (Number.isInteger((index + 1) / totalColumns)) {
          cell.classList.add('half-border-right');
        }
      });
      const context = {
        type: 'merge'
      };
      context[props.name] = Object.values(iModelValue.value[props.name]).map(i => i);
      if (activeCells.length === 1) {
        const rowSpan = parseInt(activeCells[0].getAttribute('rowspan') || 1, 10);
        const colSpan = parseInt(activeCells[0].getAttribute('colspan') || 1, 10);
        if (rowSpan > 1 || colSpan > 1) {
          const cellDetails = activeCellMap.get(activeCells[0]);
          const tds = [];
          context.type = 'split';
          if (colSpan > 1) {
            for (let j = 0; j < colSpan; j++) {
              tds.push({
                ...flatColumn[cellDetails.columnIndex + j],
                [cellDetails.columnProp]: rows[cellDetails.rowIndex][cellDetails.columnIndex + j],
                [rowKey]: rows[cellDetails.rowIndex][rowKey]
              });
            }
          }
          context.tds = tds;
        }
      }
      activeCells = null;
      cells = null;
      if (props.target && selectedCells) {
        proxy.$eventHub.$emit(
            'component:linkage',
            props.target,
            context,
            () => {
              selectedCells = false;
              iModelValue.value[props.name] = {};
              clearActiveCells();
            },
            {
              linkedOn: props.linkedOn
            }
        );
      }
    };
    onMounted(() => {
      nextTick(() => {
        iModelValue.value[props.name] = {};
        table = proxy.$parent.$parent;
        rowKey = table.rowKey;
        tableBody = table.$el.querySelector('.el-table__body-wrapper');
        if (table) {
          table.$el.addEventListener('mouseup', onMouseUp);
          table.$el.addEventListener('mousemove', onMouseMove);
          tableBody.addEventListener('mousedown', onMouseDown);
        }
      });
    });
    onBeforeUnmount(() => {
      table.$el.removeEventListener('mouseup', onMouseUp);
      table.$el.removeEventListener('mousemove', onMouseMove);
      tableBody.removeEventListener('mousedown', onMouseDown);
      table = null;
      tableBody = null;
    });
    return {
      isDragging,
      shape
    };
  }
});
</script>
<style>
.i-table-td-selector {
  position: fixed;
  background: var(--el-color-primary-light-9);
  border: 2px solid var(--el-color-primary);
  opacity: 0.5;
  z-index: 2025;
}
.active-cell {
  position: relative !important;
  background: var(--el-color-primary-light-9) !important;
  z-index: 25 !important;
}
.half-border-top {
  border-top: 1px solid var(--el-color-primary) !important;
}
.half-border-left {
  border-left: 1px solid var(--el-color-primary) !important;
}
.half-border-bottom {
  border-bottom: 1px solid var(--el-color-primary) !important;
}
.half-border-right {
  border-right: 1px solid var(--el-color-primary) !important;
}
</style>