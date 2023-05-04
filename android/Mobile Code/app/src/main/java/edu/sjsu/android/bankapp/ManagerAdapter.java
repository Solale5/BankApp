package edu.sjsu.android.bankapp;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.recyclerview.widget.RecyclerView;

import java.math.BigDecimal;
import java.util.List;

public class ManagerAdapter extends RecyclerView.Adapter<ManagerAdapter.ViewHolder>{


    private List<ManagerReport> values;
    private Context con;
    private String loginToken;
    private String host;
    // Provide a reference to the views for each data item
// Complex data items may need more than one view per item, and
// you provide access to all the views for a data item in a view holder
    public class ViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case

        public TextView managerAmt;
        public TextView managerType;
        public CardView card;
        public View layout;
        public ViewHolder(View v) {
            super(v);
            layout = v;

            managerAmt = (TextView) v.findViewById(R.id.managerAnswer);
            managerType = (TextView) v.findViewById(R.id.managerHeader);
            card = (CardView) v.findViewById(R.id.card);
        }
    }
    public void add(int position, ManagerReport item) {
        values.add(position, item);
        notifyItemInserted(position);
    }
    public void remove(int position) {
        values.remove(position);
        notifyItemRemoved(position);
    }
    // Provide a suitable constructor (depends on the kind of dataset)
    public ManagerAdapter(Context con, List<ManagerReport> myDataset, String host, String loginToken) {
        this.con = con;
        values = myDataset;
        this.host = host;
        this.loginToken = loginToken;
    }
    // Create new views (invoked by the layout manager)
    @Override
    public ManagerAdapter.ViewHolder onCreateViewHolder(ViewGroup parent,
                                                          int viewType) {
// create a new view
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View v = inflater.inflate(R.layout.manager_cards, parent, false);
// set the view's size, margins, paddings and layout parameters
        ManagerAdapter.ViewHolder vh = new ManagerAdapter.ViewHolder(v);
        return vh;
    }
    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ManagerAdapter.ViewHolder holder, final int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element

        //Type
        final String accountTypeString = values.get(holder.getAdapterPosition()).getType();
        holder.managerType.setText(accountTypeString);
        //Amt
        int managerAmt;
        double managerAmtDouble;
        if(accountTypeString.indexOf("Balance") >=0){
            managerAmtDouble = values.get(holder.getAdapterPosition()).getDmtDouble();
            BigDecimal convertScientific = new BigDecimal(""+managerAmtDouble);

            convertScientific.setScale(2,BigDecimal.ROUND_HALF_UP);
            convertScientific =  convertScientific.setScale(2,BigDecimal.ROUND_HALF_UP);


            //setting money on card on dashboard
            holder.managerAmt.setText("$" + convertScientific);

        }
        else {

            managerAmt = values.get(holder.getAdapterPosition()).getAmt();
            holder.managerAmt.setText("" + managerAmt);
        }



    }
    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return values.size();
    }
}
