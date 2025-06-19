import IRenderer from 'i-renderer/dist/js/renderer';

export const loadEditor = () => import('i-renderer/dist/js/editor');
export {IRenderer};
export {Schema, checkPermission, api} from 'i-renderer/dist/js/renderer';

import 'i-renderer/dist/css/index.css';