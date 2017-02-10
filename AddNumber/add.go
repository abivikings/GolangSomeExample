package main

import (
	"fmt"
)

func main() {
	fmt.Println(add())

	x := addTwoNo(10, 40)
	fmt.Println(x)
	fmt.Println(addTwoNo(10, 20))
}

func add() int {
	sum := 0
	for i := 0; i < 10; i++ {
		if (i % 2) == 0 {
			sum += i
		}
	}
	return sum
}

func addTwoNo(x, y int) int {
	return x + y
}

func subTwonumber(x, y int) int {
	return x - y
}
