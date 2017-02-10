package main

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"io"
	"net/http"
)

const (
	DB_USER     = "postgres"
	DB_PASSWORD = "54321"
	DB_NAME     = "information"
)

func wellcome(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "Wellcome")
}

func read(w http.ResponseWriter, r *http.Request) {

	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", dbinfo)
	checkErr(err)
	defer db.Close()

	fmt.Println("# Querying")
	rows, err := db.Query("SELECT * FROM info")
	checkErr(err)

	for rows.Next() {
		var signal_dbm string
		fmt.Println(signal_dbm)

	}

}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	http.HandleFunc("/", wellcome)
	http.HandleFunc("/read", read)
	http.ListenAndServe(":8000", nil)
}
