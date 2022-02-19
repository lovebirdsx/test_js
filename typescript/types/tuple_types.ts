function testTupleTypes() {
    function testBasic() {
        // tuple向联合的转换
        type A = ['foo', 'bar', 1];
        type B = A[number]
        type C = A[any]
    }
}
