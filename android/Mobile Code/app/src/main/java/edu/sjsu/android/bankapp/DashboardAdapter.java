package edu.sjsu.android.bankapp;

import static androidx.core.content.ContextCompat.startActivity;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import androidx.cardview.widget.CardView;
import androidx.fragment.app.FragmentActivity;
import androidx.recyclerview.widget.RecyclerView;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.net.Uri;
import androidx.fragment.app.Fragment;

public class DashboardAdapter extends RecyclerView.Adapter<DashboardAdapter.ViewHolder> {
    private List<Account> values;
    private Context con;
    private String loginToken;
    private String host;
    // Provide a reference to the views for each data item
// Complex data items may need more than one view per item, and
// you provide access to all the views for a data item in a view holder
    public class ViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public TextView accountNum;
        public TextView accountMoney;
        public TextView accountType;
        public CardView card;
        public View layout;
        public ViewHolder(View v) {
            super(v);
            layout = v;
            accountNum = (TextView) v.findViewById((R.id.accountNumber));
            accountMoney = (TextView) v.findViewById(R.id.accountMoney);
            accountType = (TextView) v.findViewById(R.id.accountTypeCard);
            card = (CardView) v.findViewById(R.id.card);
        }
    }
    public void add(int position, Account item) {
        values.add(position, item);
        notifyItemInserted(position);
    }
    public void remove(int position) {
        values.remove(position);
        notifyItemRemoved(position);
    }
    // Provide a suitable constructor (depends on the kind of dataset)
    public DashboardAdapter(Context con, List<Account> myDataset, String host, String loginToken) {
        this.con = con;
        values = myDataset;
        this.host = host;
        this.loginToken = loginToken;
    }
    // Create new views (invoked by the layout manager)
    @Override
    public DashboardAdapter.ViewHolder onCreateViewHolder(ViewGroup parent,
                                                   int viewType) {
// create a new view
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View v = inflater.inflate(R.layout.accounts_layout, parent, false);
// set the view's size, margins, paddings and layout parameters
        ViewHolder vh = new ViewHolder(v);
        return vh;
    }
    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ViewHolder holder, final int position) {
    // - get element from your dataset at this position
    // - replace the contents of the view with that element

        //Account Type
        final String accountTypeString = values.get(holder.getAdapterPosition()).getType();
        holder.accountType.setText(accountTypeString);
        //Account Number
        final int accountNumber = values.get(holder.getAdapterPosition()).getAccountNumber();
        System.out.println(accountNumber);
        String lastFour = String.valueOf(accountNumber);
        holder.accountNum.setText("******" + lastFour.substring(lastFour.length()-4));
        //Account Money
        final double accountMoney = values.get(holder.getAdapterPosition()).getMoney();

        //converting the scientific notation
        BigDecimal convertScientific = new BigDecimal(""+accountMoney);
        convertScientific.setScale(2,BigDecimal.ROUND_HALF_UP);
        convertScientific =  convertScientific.setScale(2,BigDecimal.ROUND_HALF_UP);


        //setting money on card on dashboard
        holder.accountMoney.setText("$" + convertScientific);

        //setting onclick listener for the cards itself
        holder.card.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(con,AccountDetailsFragment.class);

                intent.putExtra("accountNumber",values.get(holder.getAdapterPosition()).getAccountNumber());
                intent.putExtra("balance",accountMoney);
                intent.putExtra("type",accountTypeString);
                Bundle bundle = new Bundle();
                bundle.putInt("accountNumber",values.get(holder.getAdapterPosition()).getAccountNumber());
                bundle.putDouble("balance",accountMoney);
                bundle.putString("type",accountTypeString);
                bundle.putString("loginToken",loginToken);
                bundle.putString("host",host);
                Fragment fragment = new AccountDetailsFragment();
                fragment.setArguments(bundle);

                ((FragmentActivity)con).getSupportFragmentManager().beginTransaction().replace(R.id.dashboardLayout, fragment).commit();

            }
        });

    }
    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return values.size();
    }


}