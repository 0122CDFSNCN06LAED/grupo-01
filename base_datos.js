Users = {
  "id": Int unsigned autoincrement Not Null,
  "name": Varchar(255) Not null,
  "lastname": Varchar(255) Not null,
  "email": Varchar(255) Not null,
  "username": Varchar(255) Not null,
  "password":  Varchar(500) Not null,
  "password": Varchar(500) Not null,
  "image": 


}


Products ={
    "id": id  Int unsingned autoicrement Not null,
    "name": name Varchar(500) Not null,
    "Description": Varchar(500) Not null,
    "price": Decimal,
    "region": Varchar(10),
    "image": Blob,
	  "id_category": INT
	  "id_grind": INT
    "id_weight":INT

    
  },

  User_Product ={
    "id": INT,
	  "id_user": INT,
    "id_prodcut": INT
	}



Categorys ={
	"id": INT,
	name: Varchar(255)
	}

Grinds ={
	"id": INT
	"name: Varchar(255)
	}

Weights={
	"id": INT,
	"weight": Varchar(255)
}