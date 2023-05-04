package edu.sjsu.android.bankapp;

import android.content.DialogInterface;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentTransaction;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link TransactionsFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class TransactionsFragment extends Fragment implements View.OnClickListener {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private ImageButton addAccountButton;
    private ImageButton transferButton;
    private ImageButton billPaymentButton;
    private ImageButton imageDepositButton;
    private ImageButton deleteButton;
    private ImageButton withdrawButton;
    private Fragment fragment;
    private String loginToken;
    private String host;
    private TextView accountHeader;


    public TransactionsFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment TransactionsFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static TransactionsFragment newInstance(String param1, String param2) {
        TransactionsFragment fragment = new TransactionsFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragmentFragment fragment = null;
        fragment = null;

        loginToken = getArguments().getString("loginToken");
        host = getArguments().getString("host");

       View view =  inflater.inflate(R.layout.transactions_fragment, container, false);

       //account header on top of view
        accountHeader = getActivity().findViewById(R.id.accountHeader);
        accountHeader.setText("");

       //Transfer Button
        transferButton = view.findViewById((R.id.transferbutton));
        transferButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                fragment = new TransferFragment();
                Bundle bundle = new Bundle();
                bundle.putString("loginToken",loginToken);
                bundle.putString("host",host);

                fragment.setArguments(bundle);
                if(fragment !=null){
                    //checks if fragment exists
                    loadFragment(fragment);
                }

            }
        });

        //Bill Payment Button

        billPaymentButton = view.findViewById((R.id.billpaymentbuttoninTransaction));
        billPaymentButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                fragment = new BillPaymentFragment();
                Bundle bundle = new Bundle();
                bundle.putString("loginToken",loginToken);
                bundle.putString("host",host);

                fragment.setArguments(bundle);
                if(fragment !=null){
                    //checks if fragment exists
                    loadFragment(fragment);
                }

            }
        });


        //Add Account Button

        addAccountButton = view.findViewById((R.id.addAccountButton));
        addAccountButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                fragment = new AddAccountFragment();
                Bundle bundle = new Bundle();
                bundle.putString("loginToken",loginToken);
                bundle.putString("host",host);

                fragment.setArguments(bundle);
                if(fragment !=null){
                    //checks if fragment exists
                    loadFragment(fragment);
                }

            }
        });


        //Image Deposit Button

        imageDepositButton = view.findViewById((R.id.imagedepositbutton));
        imageDepositButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                fragment = new ImageDepositFragment();
                Bundle bundle = new Bundle();
                bundle.putString("loginToken",loginToken);
                bundle.putString("host",host);

                fragment.setArguments(bundle);
                if(fragment !=null){
                    //checks if fragment exists
                    loadFragment(fragment);
                }

            }
        });

        //Withdraw Button
        withdrawButton = view.findViewById((R.id.withdrawButton));
        withdrawButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                fragment = new withdrawFragment();
                Bundle bundle = new Bundle();
                bundle.putString("loginToken",loginToken);
                bundle.putString("host",host);

                fragment.setArguments(bundle);
                if(fragment !=null){
                    //checks if fragment exists
                    loadFragment(fragment);
                }

            }
        });

        //Delete Button
        deleteButton = view.findViewById((R.id.deleteButton));
        deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                fragment = new DeleteAccountFragment();
                Bundle bundle = new Bundle();
                bundle.putString("loginToken",loginToken);
                bundle.putString("host",host);

                fragment.setArguments(bundle);
                if(fragment !=null){
                    //checks if fragment exists
                    loadFragment(fragment);
                }

            }
        });




       return view;
    }



    public void loadFragment(Fragment fragment){

        getParentFragmentManager().beginTransaction().replace(R.id.dashboardLayout, fragment).commit();
    }


    @Override
    public void onClick(View v) {

        Fragment fragment = null;
        switch(v.getId()){

            case R.id.imagedepositbutton:
                fragment = new ImageDepositFragment();


                break;
            case R.id.transferbutton:

                fragment = new TransferFragment();
                break;

            case R.id.billpaymentbuttoninTransaction:

                fragment = new BillPaymentFragment();
                break;

            case R.id.addAccountButton:
                fragment = new AddAccountFragment();
                break;




        }
        if(fragment !=null){
            //checks if fragment exists
            loadFragment(fragment);
        }

    }
}