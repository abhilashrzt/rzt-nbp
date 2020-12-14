import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { expect } from 'chai';
import Button from './Button';
import styles from './Button.css';

describe('Button component', () => {

    const renderer = renderIntoDocument(<Button text={"CLICK ME"}
                                                 className={styles["title-list__action-button"]}
                                                ></Button>);
    const dom = ReactDOM.findDOMNode(renderer);

    it('should render correctly', () => {
        return expect(renderer).to.be.ok;
    });

    it('should render with correct value', () => {
        const text = dom.getElementsByTagName('button')[0].textContent;
        expect(text).to.equal("CLICK ME");
    });

    it('should render with a reload button', () => {
        const text = dom.getElementsByTagName('button')[0].textContent;
        expect(text).to.be.a('string');
    });

    it('should render the correct className', () => {

        expect(styles["title-list__action-button"]).to.be.a('string');
        expect(dom.className).to.include(styles["title-list__action-button"]);
    });
});
