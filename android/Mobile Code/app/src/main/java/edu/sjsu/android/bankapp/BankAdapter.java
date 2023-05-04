package edu.sjsu.android.bankapp;

/*

https://stackoverflow.com/questions/15941732/start-intent-in-adapter
helped with making intents in adapter
lecture slides for alert
 */
import static androidx.core.content.ContextCompat.startActivity;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;
import java.util.List;
import androidx.recyclerview.widget.RecyclerView;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.net.Uri;

public class BankAdapter extends RecyclerView.Adapter<BankAdapter.ViewHolder> {
    private List<Account> values;
    private Context con;
    // Provide a reference to the views for each data item
// Complex data items may need more than one view per item, and
// you provide access to all the views for a data item in a view holder
    public class ViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public TextView accountMoney;
        public TextView accountNumber;
        public View layout;
        public ViewHolder(View v) {
            super(v);
            layout = v;
            accountMoney = v.findViewById((R.id.accountMoney));
            accountNumber = v.findViewById(R.id.accountNumber);
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
    public BankAdapter(Context con, List<Account> myDataset) {
        this.con = con;
        values = myDataset;
    }
    // Create new views (invoked by the layout manager)
    @Override
    public BankAdapter.ViewHolder onCreateViewHolder(ViewGroup parent,
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

        //Animal thumbnail
        final int accountNumber = values.get(position).getAccountNumber();
        holder.accountNumber.setText(accountNumber);
        //Animal name

        final double accountMoney = values.get(position).getMoney();
        holder.accountMoney.setText(String.valueOf(accountMoney));




    }
    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return values.size();
    }


}