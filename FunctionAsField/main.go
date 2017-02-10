package main


type op struct {
    name string
    fn func(int, int) int
}
func main() {
// seed your random number generator
rand.Seed(time.Now().Unix())
// create a slice of ops
ops := []op{
{"add", func(x, y int) int { return x + y }},
{"sub", func(x, y int) int { return x ‐ y }},
{"mul", func(x, y int) int { return x * y }},
{"div", func(x, y int) int { return x / y }},
{"mod", func(x, y int) int { return x % y }},
}
// pick one of those ops at random
o := ops[rand.Intn(len(ops))]
x, y := 12, 5
fmt.Println(o.name, x, y)
fmt.Println(o.fn(x, y))
}