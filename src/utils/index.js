export {createReducerFromObject} from './reducerUtils';
export {request, dsProgressListener, dsListener} from './request';
export {getHooks} from './hooks';
export {dateformatter} from './formatter';
export {cancelSaga} from './sagaUtils';
export {formatINR, shortenINR, nFormatter} from './formatter';
export const clamp = (min, max) => val => Math.min(Math.max(min, val), max);

export function queryGenerator (obj) {
    let query = _.map(obj, (value, key)=>{
        if (value && key) return `${key}=${value}`
    }).filter(i=>i);

    if (query.length==0) return '';

    return `?${query.join('&')}`
}
//
// returns a list of all elements under the cursor
//
export function elementsFromPointFallback(x,y) {
    var elements = [], previousPointerEvents = [], current, i, d;

    // get all elements via elementFromPoint, and remove them from hit-testing in order
    while ((current = document.elementFromPoint(x,y)) && elements.indexOf(current)===-1 && current != null) {

        // push the element and its current style
        elements.push(current);
        previousPointerEvents.push({
            value: current.style.getPropertyValue('pointer-events'),
            priority: current.style.getPropertyPriority('pointer-events')
        });

        // add "pointer-events: none", to get to the underlying element
        current.style.setProperty('pointer-events', 'none', 'important');
    }

    // restore the previous pointer-events values
    for(i = previousPointerEvents.length; d=previousPointerEvents[--i]; ) {
        elements[i].style.setProperty('pointer-events', d.value?d.value:'', d.priority);
    }

    // return our results
    return elements;
}