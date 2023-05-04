package edu.sjsu.android.bankapp;

import java.util.ArrayList;
import java.util.Random;

public class Transactions {


    private String transactionType;
    private double transactionAmount;
    private String description;


    public Transactions(double transactionAmount, String transactionType, String description){


        this.transactionType = transactionType;
        this.transactionAmount = transactionAmount;
        this.description = description;
    }


    public String getTransactionType(){
        return this.transactionType;
    }

    public String getDescription(){
        return this.description;
    }

    public double getTransactionAmt(){
        return this.transactionAmount;
    }


}
