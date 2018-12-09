package main

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"log"
	"net/http"
)

func getContacts(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT name FROM contact")

	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			log.Fatal(err)
		}
		w.Write([]byte(name))
		w.Write([]byte("\n"))
	}
	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}

}

var db *sql.DB

func main() {
	fmt.Printf("@@@@@@@@ Starting server @@@@@@@@\n")
	var err error
	connStr := "postgres://postgres:password@postgres/jobhunt?sslmode=disable"
	// connStr := "user=postgres dbname=jobhunt password=password"
	db, err = sql.Open("postgres", connStr)

	if err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/getContacts", getContacts)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
