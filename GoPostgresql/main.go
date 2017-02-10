package main

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

const (
	DB_USER     = "postgres"
	DB_PASSWORD = "54321"
	DB_NAME     = "information"
)

func main() {
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", dbinfo)
	checkErr(err)
	defer db.Close()

	fmt.Println("# Inserting values")

	var lastInsertId int
	stmt, err := db.Prepare("INSERT INTO info(name,des,add,sex) VALUES($1,$2,$3,$4);")
	res, err := stmt.Exec("astaxie", "研发部门", "2012-12-09")
	fmt.Println(res.LastInsertId())
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
