package main

import (
	"fmt"

	"github.com/koding/kite"
)

func main() {
	k := kite.New("exp2", "1.0.0")

	// Connect to our math kite
	mathWorker := k.NewClient("http://localhost:3636/kite")
	mathWorker.Dial()

	square, _ := mathWorker.Tell("square", 4)
	fmt.Println("result:", square.MustFloat64())

	add, _ := mathWorker.Tell("add", []int{2, 3})
	fmt.Println("sum:", add.MustFloat64())

	stringArray, _ := mathWorker.Tell("stringArray", []string{"hello", "world", "dhaka", "bangladesh"})
	fmt.Println(stringArray.MustString())

	mapdata, _ := mathWorker.Tell("map", map[string]string{"hello": "dhaka", "new": "test"})
	fmt.Println(mapdata.MustMap())
}
