package edu.sjsu.android.bankapp;

import java.util.ArrayList;

public class ManagerReport {


    private int amt;
    private double dmtDouble;
    private String type;



    public ManagerReport(String type, int amt){
        this.amt = amt;
        this.type = type;
    }

    public ManagerReport(String type, double dmtDouble){
        this.dmtDouble = dmtDouble;
        this.type = type;
    }


    public String getType(){
        return this.type;
    }

    public int getAmt(){
        return this.amt;
    }

    public double getDmtDouble(){
        return this.dmtDouble;
    }
}
