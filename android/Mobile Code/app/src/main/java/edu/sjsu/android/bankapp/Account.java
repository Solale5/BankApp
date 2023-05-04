package edu.sjsu.android.bankapp;


import java.util.ArrayList;

public class Account {

    private int accountNumber;
    private double money;
    private ArrayList<Transactions> transactions;
    private String type;


    public Account(int number, double money, String type){
        this.accountNumber = number;
        this.money = money;
        this.type = type;

    }


    public int getAccountNumber(){
        return this.accountNumber;
    }

    public double getMoney(){
        return this.money;
    }

    public String getType(){return this.type; }

    public ArrayList<Transactions> getTransactions(){ return this.transactions;}

}
