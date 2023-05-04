package edu.sjsu.android.bankapp;

import android.annotation.SuppressLint;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;

import android.text.InputFilter;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link TransferFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class TransferFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    private Spinner transferSpinner;
    private EditText destAccountNumber;
    private Button transferButton;
    private EditText transferAmount;
    private String host;
    private String loginToken;
    final String allAccountsEndpoint = "/api/clients/me/accounts";
    final String transferEndpoint = "/api/clients/me/accounts/";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public TransferFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment TransferFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static TransferFragment newInstance(String param1, String param2) {
        TransferFragment fragment = new TransferFragment();
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

    @SuppressLint("MissingInflatedId")
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.transfer_fragment, container, false);
        loginToken = getArguments().getString("loginToken");
        host = getArguments().getString("host");

        transferSpinner = view.findViewById(R.id.transferAccountSpinner);
        destAccountNumber = view.findViewById(R.id.transferReceivingAccountNumber);
        transferButton = view.findViewById(R.id.transferButtonFragment);
        transferAmount = view.findViewById(R.id.transferAmount);
        DecimalDigitsInputFilter somethingFilter = new DecimalDigitsInputFilter(2);
        transferAmount.setFilters(new InputFilter[]{somethingFilter});




        RequestQueue queue = Volley.newRequestQueue(getContext());
        JSONObject params = new JSONObject();

        final String requestBody = params.toString();

        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.GET, host+allAccountsEndpoint,null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    JSONArray temp = response.getJSONArray("accounts");
                    ArrayList<Account> accountList = parseAccounts(temp);
                    ArrayList<String> accountNumberList = new ArrayList<>();
                    for(int i = 0; i < accountList.size(); i++){
                        if(!accountList.get(i).getType().equalsIgnoreCase("credit")) {
                            accountNumberList.add(accountList.get(i).getType() + ": " + accountList.get(i).getAccountNumber());
                        }
                    }
                    ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_dropdown_item, accountNumberList);
                    arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    transferSpinner.setAdapter(arrayAdapter);



                } catch (JSONException e) {
                    e.printStackTrace();
                }
                //Toast.makeText(getContext(),"Account Added!", Toast.LENGTH_SHORT).show();
                //Log.i("VOLLEY", response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getContext(),"Error Fetching Account!", Toast.LENGTH_SHORT).show();
                Log.e("VOLLEY", error.toString());
            }
        }) {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }

            @Override
            public byte[] getBody() {
                try {
                    return requestBody == null ? null : requestBody.getBytes("utf-8");
                } catch (UnsupportedEncodingException uee) {
                    VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s", requestBody, "utf-8");
                    return null;
                }
            }
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String>  params = new HashMap<String, String>();
                params.put("Authorization", loginToken);

                return params;
            }


        };

        queue.add(jsonRequest);

        transferButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(checkFields()) {
                    if (transferSpinner.getSelectedItem() == null) {
                        Toast.makeText(getContext(), "No Accounts!", Toast.LENGTH_SHORT).show();

                    } else {
                        try {
                            startTransfer();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }

            }
        });

        return view;
    }

    public ArrayList<Account> parseAccounts(JSONArray jsonArray) throws JSONException {
        ArrayList<Account> accountList = new ArrayList<>();
        for (int i = 0; i < jsonArray.length(); i++){
            JSONObject tempJSON = jsonArray.getJSONObject(i);
            int tempAccountNumber = tempJSON.getInt("accountNumber");
            double tempMoney = tempJSON.getDouble("balance");

            Account temp = new Account(tempAccountNumber, tempMoney,tempJSON.getString("type"));
            accountList.add(temp);
        }

        return accountList;
    }

    public void startTransfer() throws JSONException {
        RequestQueue queue = Volley.newRequestQueue(getContext());
        JSONObject params = new JSONObject();

        params.put("balance", Double.parseDouble(String.valueOf(transferAmount.getText())));
        params.put("description", "Transfer between accounts");
        String spinnerSelection = transferSpinner.getSelectedItem().toString();
        String onlyAccNum = spinnerSelection.substring(spinnerSelection.indexOf(" ") + 1);
        params.put("accountNumber", destAccountNumber.getText().toString());
        params.put("accountID", onlyAccNum);

        final String requestBody = params.toString();


        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, host+transferEndpoint+onlyAccNum+"/transfer",null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Bundle responseBundle = new Bundle();
                responseBundle.putString("loginToken",loginToken);
                responseBundle.putString("host",host);
                Fragment responseFrag = new DashboardFragment();
                responseFrag.setArguments(responseBundle);
                loadFragment(responseFrag);
                Toast.makeText(getContext(),"Money Successfully Transferred", Toast.LENGTH_SHORT).show();


            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getContext(),"Error Transferring!", Toast.LENGTH_SHORT).show();
                Log.e("VOLLEY", error.toString());
            }
        }) {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }

            @Override
            public byte[] getBody() {
                try {
                    return requestBody == null ? null : requestBody.getBytes("utf-8");
                } catch (UnsupportedEncodingException uee) {
                    VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s", requestBody, "utf-8");
                    return null;
                }
            }
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String>  params = new HashMap<String, String>();
                params.put("Authorization", loginToken);

                return params;
            }


        };

        queue.add(jsonRequest);


    }

    public boolean checkFields(){

        if(destAccountNumber.length() == 0){
            destAccountNumber.setError("This field is required!");
        }

        if(transferAmount.length() == 0){
            transferAmount.setError("This field is required!");
            return false;
        }




        return true;
    }

    public void loadFragment(Fragment fragment){
        ((FragmentActivity)getContext()).getSupportFragmentManager().beginTransaction().replace(R.id.dashboardLayout, fragment).commit();

    }
}