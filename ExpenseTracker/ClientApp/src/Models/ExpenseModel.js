import React from "react";
import User from "./UserClass";

class Expense{
    constructor(props){
        this.state = {
            user: props.user,
            userId: props.user.id,
            category: props.category,
            title: props.title ,
            currency: props.currency ,
            price: props.price ,
            date: new Date(props.date) || new Date()
        }
    }
}

export default Expense