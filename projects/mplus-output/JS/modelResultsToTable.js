const getHeadersOfTable = (results) => {

    let RegExpHeaders = /(Two-Tailed$|P-Value$)/gm
    return results.content.filter((c) => c.match(RegExpHeaders))
}


