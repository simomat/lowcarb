'use strict';

class Domain {
    constructor(domain) {
        this.domain = domain;
    }

    matches(domainExpression) {
        if (domainExpression === this.domain) {
            return true;
        }


        let macthes = domainExpression.endsWith(this.domain)
            && domainExpression.substr(0, domainExpression.length - this.domain.length).endsWith('.');

        console.log('macthes: ' + this.domain + ' + ' + domainExpression + ': ' + macthes);

        return macthes;
    }
}

export { Domain };
