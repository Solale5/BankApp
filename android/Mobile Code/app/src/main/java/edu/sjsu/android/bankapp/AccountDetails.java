package edu.sjsu.android.bankapp;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class AccountDetails extends AppCompatActivity {

    TextView accountDetailsMoney;
    TextView accountDetailsNumber;
    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager layoutManager;

    @SuppressLint("MissingInflatedId")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.account_details_layout);
        //recyclerView = (RecyclerView) findViewById(R.id.details_recycle_view);

        //recyclerView.setHasFixedSize(true);
       // layoutManager = new LinearLayoutManager(this);
       // recyclerView.setLayoutManager(layoutManager);


        accountDetailsMoney = (TextView) findViewById(R.id.accountDetailsMoney);
        accountDetailsNumber = (TextView) findViewById(R.id.accountDetailsNum);

        Intent intent = getIntent();
        //System.out.println(intent.getStringExtra("accountNumber"));
        accountDetailsMoney.setText(String.valueOf(intent.getFloatExtra("money",0)));
        accountDetailsNumber.setText(String.valueOf(intent.getIntExtra("accountNumber",0)));

        //ArrayList<Transactions> input = (ArrayList<Transactions>) getIntent().getSerializableExtra("transactions") ;


        //mAdapter= new AccountDetailsAdapter(AccountDetails.this,input);
        //recyclerView.setAdapter(mAdapter);



    }
}
