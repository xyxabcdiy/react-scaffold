import Loadable from 'react-loadable';
import Loading from 'Components/Loading';

/**
 * 生成异步组件
 * @param   {{loader: Promise<Component>, delay: Number}} options
 * @return  {Component}
 * @constructor
 */
const AsyncComponent = (options) => {
    return Loadable({
        loading: Loading,
        ...options
    });
};

export default AsyncComponent;
