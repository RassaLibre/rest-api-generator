r.HandleFunc("/Oven", Handlers.HomeHandler).Methods("GET", "POST", "PUT")
