package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/lib/pq"
	"io"
	"io/ioutil"
	"net/http"
)

const (
	DB_USER     = "postgres"
	DB_PASSWORD = "54321"
	DB_NAME     = "information"
)

type Box struct {
	Mac          string
	SignalDBM    string
	MinsignalDBM string
	MaxsignalDBM string
}

func wellcome(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "Wellcome")
}

func create(w http.ResponseWriter, r *http.Request) {

	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", dbinfo)
	checkErr(err)
	defer db.Close()

	data := make(map[string]string)

	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &data)

	for k, v := range data {
		key = k
		value = v
		data[key] = value
	}

	stmt, err := db.Prepare("INSERT INTO test(name, address) VALUES($1,$2);")
	res, err := stmt.Exec(data["name"], data["address"])
	checkErr(err)
	fmt.Println(res)
	defer r.Body.Close()

	io.WriteString(w, "create")

}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {

	http.HandleFunc("/", wellcome)
	http.HandleFunc("/create", create)
	http.ListenAndServe(":8000", nil)
}
