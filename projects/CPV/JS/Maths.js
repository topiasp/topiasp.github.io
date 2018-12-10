
global.Maths = {}

global.Maths.getMax = function(biggest,number) { return(Math.max(biggest,number)) }



global.Maths.sum = function(a)  {
    return(a.reduce(function(total,n) { return(total+n) }));
    
}


global.Maths.mean = function(a,weights) {	

    weights = weights || this.replicate(1,a.length); // If no weights are provided, apply with a weight of 1
    
    return( 
        this.sum( a.map(function(x,i) { return(x * weights[i]) }) )
        /
        this.sum(weights)
        )
}




global.Maths.replicate= function(c,n) {
    let rtrn = [];
    for(var i=0;i<n;i++) {
        rtrn.push(c);
    }
    return(rtrn);
}






// Distance function
global.Maths.etaisyys = function(p1,p2) {  
    return( Math.sqrt(Math.pow((p2.left - p1.left),2) + Math.pow((p2.top - p1.top),2)) ) ;
}

// Thousand separator

global.Maths.thousandSeparator = function(s) {

    if (typeof s != 'string') { s = new String(s) }

    let arr = [];
    arr.push( s.substring(0,s.length % 3) );
    s = s.substring(s.length % 3)

    arr = arr.concat(s.split(/([0-9]{3})/))

    return( arr.filter(function(x) { return(x.length>0) }).join(' ') ) ;


}

global.Maths.tidyNumber = function(s,decimals) {

    if (typeof s != 'number') {

    return s;
    }

    decimals = decimals || 0;

    return this.thousandSeparator(  s.toFixed(decimals) )

}
