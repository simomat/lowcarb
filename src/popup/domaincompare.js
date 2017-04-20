
function* reversedParts(domain) {
    let lastEnd = domain.length;
    for (let index = lastEnd-1; index >= -1; --index) {
        if (domain[index] == '.' || index == -1) {
            yield domain.substring(index + 1, lastEnd);
            lastEnd = index;
        }
    }
}

export function domainCompare(domainA, domainB) {
    let partsA = reversedParts(domainA);
    let partsB = reversedParts(domainB);

    while (true) {
        let nextA = partsA.next();
        let nextB = partsB.next();

        if (nextA.done) {
            if (nextB.done) {
                return 0;
            }
            return -1;
        }
        if (nextB.done) {
            return 1;
        }
        if (nextA.value > nextB.value) {
            return 1;
        }
        if (nextA.value < nextB.value) {
            return -1;
        }
    }
}
