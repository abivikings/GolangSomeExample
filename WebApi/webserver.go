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

	value := ""
	key := ""
	for k, v := range data {
		key = k
		value = v
		data[key] = value
	}

	stmt, err := db.Prepare("INSERT INTO info(mac, station, signal_dbm, minsignal_dbm, maxsignal_dbm, noise_dbm, minnoise_dbm, maxnoise_dbm) VALUES($1,$2,$3,$4,$5,$6,$7,$8);")
	res, err := stmt.Exec(data["mac"], data["station"], data["signal_dbm"], data["minsignal_dbm"], data["maxsignal_dbm"], data["noise_dbm"], data["minnoise_dbm"], data["maxnoise_dbm"])
	checkErr(err)
	fmt.Println(res)
	defer r.Body.Close()

	io.WriteString(w, "create")

}

func read(w http.ResponseWriter, r *http.Request) {

	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", dbinfo)
	checkErr(err)
	defer db.Close()

	var (
		id            string
		mac           string
		station       string
		signal_dbm    string
		minsignal_dbm string
		maxsignal_dbm string
		noise_dbm     string
		minnoise_dbm  string
		maxnoise_dbm  string
	)

	rows, err := db.Query("select * from info")
	checkErr(err)
	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(&id, &mac, &station, &signal_dbm, &minsignal_dbm, &maxsignal_dbm, &noise_dbm, &minnoise_dbm, &maxnoise_dbm)
		checkErr(err)

		box := Box{
			Mac:          mac,
			SignalDBM:    signal_dbm,
			MinsignalDBM: maxsignal_dbm,
			MaxsignalDBM: maxsignal_dbm,
		}
		data, _ := json.Marshal(box)

		w.Write([]byte(data))
	}
	err = rows.Err()
	checkErr(err)

}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {

	http.HandleFunc("/", wellcome)
	http.HandleFunc("/create", create)
	http.HandleFunc("/read", read)
	http.ListenAndServe(":8000", nil)
}
