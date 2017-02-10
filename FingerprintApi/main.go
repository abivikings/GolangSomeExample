package main

import (
	"database/sql"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"

	_ "github.com/lib/pq"
)

const (
	DB_USER     = "postgres"
	DB_PASSWORD = "postgres"
	DB_NAME     = "test"
)

type userData struct {
	Name         string
	Address      string
	DOB    string
	ProImageName     string
	ProImageLoc     string
	FingerImageName     string
	FingerImageLoc     string
}

type resData struct {
	Status   string
	Messages string
}

func wellcome(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "Wellcome")
}

func inserData(w http.ResponseWriter, r *http.Request) {
    dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
        DB_USER, DB_PASSWORD, DB_NAME)
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
	defer r.Body.Close()
	if data != nil {
		var lastInsertId int
		err = db.QueryRow("INSERT INTO userinfo(name, address, dob, proImageName, proImageLoc, fingerImageName, fingerImageLoc) VALUES($1,$2,$3,$4,$5,$6,$7) returning uid;", data["Name"], data["Address"], data["DOB"], data["ProImageName"], data["ProImageLoc"], data["FingerImageName"], data["FingerImageLoc"]).Scan(&lastInsertId)
		checkErr(err)
		resdata := resData{"success", "Data submited"}
		x, err := json.Marshal(resdata)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(x)
	} else {
		resdata := resData{"fail", "fail to submit data"}
		x, err := xml.Marshal(resdata)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(x)
	}
}

func checkData(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	dt := string(body)
	data, _ := json.Marshal(dt)
	defer r.Body.Close()
	if data != nil {
		resdata := resData{"success", "Data submited"}
		x, err := json.Marshal(resdata)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(x)
	} else {
		resdata := resData{"fail", "fail to submit data"}
		x, err := xml.Marshal(resdata)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(x)
	}

}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {

	http.HandleFunc("/index", wellcome)
	http.HandleFunc("/check", checkData)
	http.HandleFunc("/insert", inserData)
	http.ListenAndServe(":8000", nil)
}
