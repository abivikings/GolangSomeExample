package main

import (
	"fmt"
)

func main() {
	myMap := map[string]string{"key1": "value1", "key2": "value2", "key3": "value3"}
	var inputKey string
	fmt.Scanf("%s", &inputKey)
	for k, v := range myMap {
		if inputKey == k {
			fmt.Println(v)
		}
	}

}
