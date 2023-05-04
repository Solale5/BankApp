package edu.sjsu.android.bankapp;

import static androidx.core.content.ContextCompat.startActivity;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import androidx.cardview.widget.CardView;
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

public class AccountDetailsAdapter extends RecyclerView.Adapter<AccountDetailsAdapter.ViewHolder> {
    private List<Transactions> values;
    private Context con;
    // Provide a reference to the views for each data item
// Complex data items may need more than one view per item, and
// you provide access to all the views for a data item in a view holder
    public class ViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public TextView transactionAmount;
        public TextView transactionType;
        public TextView transactionDescription;
        public CardView card;
        public View layout;
        public ViewHolder(View v) {
            super(v);
            layout = v;
            transactionAmount = (TextView) v.findViewById((R.id.transactionAmount));
            transactionType = (TextView) v.findViewById(R.id.transactionType);
            transactionDescription = (TextView) v.findViewById(R.id.transactionDescription);
            card = (CardView) v.findViewById(R.id.transactionCard);
        }
    }
    public void add(int position, Transactions item) {
        values.add(position, item);
        notifyItemInserted(position);
    }
    public void remove(int position) {
        values.remove(position);
        notifyItemRemoved(position);
    }
    // Provide a suitable constructor (depends on the kind of dataset)
    public AccountDetailsAdapter(Context con, List<Transactions> myDataset) {
        this.con = con;
        values = myDataset;
    }
    // Create new views (invoked by the layout manager)
    @Override
    public AccountDetailsAdapter.ViewHolder onCreateViewHolder(ViewGroup parent,
                                                          int viewType) {
// create a new view
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        //transaction layout
        View v = inflater.inflate(R.layout.transaction_layout, parent, false);
// set the view's size, margins, paddings and layout parameters
        ViewHolder vh = new ViewHolder(v);
        return vh;
    }
    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ViewHolder holder, final int position) {
// - get element from your dataset at this position
// - replace the contents of the view with that element
        //NOTE: I NEED Transaction amount & type to display on the "cards"


        final double transactionAmount = values.get(holder.getAdapterPosition()).getTransactionAmt();
        BigDecimal convertScientific = new BigDecimal(""+transactionAmount);

        convertScientific.setScale(2,BigDecimal.ROUND_HALF_UP);
        convertScientific =  convertScientific.setScale(2,BigDecimal.ROUND_HALF_UP);


        if(values.get(holder.getAdapterPosition()).getTransactionType().equals("Withdraw") || values.get(holder.getAdapterPosition()).getDescription().indexOf("out") >= 0){
            holder.transactionAmount.setText("-$" + convertScientific);
        }
        else {
            holder.transactionAmount.setText("$" + convertScientific);
        }

        //transaction type
        final String transactionType = values.get(holder.getAdapterPosition()).getTransactionType();

        holder.transactionType.setText(transactionType);

        //transaction description
        if(values.get(holder.getAdapterPosition()).getDescription() != null) {
            final String description = values.get(holder.getAdapterPosition()).getDescription();
            holder.transactionDescription.setText(description);
        }

        //holder.txtFooter.setText("Footer: " + name);
    }
    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return values.size();
    }


}