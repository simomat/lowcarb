export class Domain {
    constructor(domain) {
        this.domain = domain;
        this.pattern = new RegExp('^\.?' + this.domain + '$', 'i');
    }

    matches(domainExpression) {
        return this.pattern.test(domainExpression);
    }
}

export const createDomainFromString = domainString => new Domain(domainString);