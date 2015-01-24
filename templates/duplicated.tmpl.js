r.HandleFunc("/<%= model.name %>", Handlers.HomeHandler).Methods("GET", "POST", "PUT")
