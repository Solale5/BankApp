package edu.sjsu.android.bankapp;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.math.BigDecimal;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link AccountDetailsFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class AccountDetailsFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    private String loginToken;
    private String host;

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    TextView accountDetailsMoney;
    TextView accountDetailsNumber;
    TextView accountDetailsType;
    public AccountDetailsFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment AccountDetailsFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static AccountDetailsFragment newInstance(String param1, String param2) {
        AccountDetailsFragment fragment = new AccountDetailsFragment();
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
        // Inflate the layout for this fragment
        loginToken = getArguments().getString("loginToken");
        host = getArguments().getString("host");

        View view = inflater.inflate(R.layout.account_details_fragment, container, false);
        accountDetailsMoney = (TextView) view.findViewById(R.id.accountDetailsMoneyFrag);
        accountDetailsNumber = (TextView) view.findViewById(R.id.accountDetailsNumFrag);
        accountDetailsType = (TextView) view.findViewById(R.id.accountTypeCard);
        accountDetailsType.setText(getArguments().getString("type"));

        //converting balance to big decimal
        BigDecimal convertScientific = new BigDecimal(String.valueOf(getArguments().getDouble("balance")));

        convertScientific.setScale(2,BigDecimal.ROUND_HALF_UP);
        convertScientific =  convertScientific.setScale(2,BigDecimal.ROUND_HALF_UP);


        accountDetailsMoney.setText("$" + convertScientific);
        accountDetailsNumber.setText(String.valueOf(getArguments().getInt("accountNumber")));


        Bundle bundle = new Bundle();
        bundle.putString("loginToken",loginToken);
        bundle.putString("host",host);
        bundle.putString("accountNumber",String.valueOf(accountDetailsNumber.getText()));
        Fragment firstFrag = new TransactionsRecyclerFragment();
        firstFrag.setArguments(bundle);
        loadFragment(firstFrag);


        return view;

    }

    public void loadFragment(Fragment fragment){

        ((FragmentActivity)getContext()).getSupportFragmentManager().beginTransaction().replace(R.id.accountDetailsLayout, fragment).commit();
    }
}