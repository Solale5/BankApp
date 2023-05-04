package edu.sjsu.android.bankapp;

import android.annotation.SuppressLint;
import android.os.Bundle;

import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;

import android.text.InputFilter;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TimePicker;
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
 * Use the {@link BillPaymentFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class BillPaymentFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private String host;
    private String loginToken;
    private Spinner billPaymentSpinner;
    private EditText billPaymentAmount;
    private Button setUpBillPaymentButton;
    private Spinner creditSpinner;
    private Spinner frequencySpinner;
    private Spinner dayOfWeekSpinner;
    private Spinner dayOfMonthSpinner;
    private TimePicker timePick;
    private LinearLayout weekLayout;
    private LinearLayout monthLayout;
    final String allAccountsEndpoint = "/api/clients/me/accounts";
    final String automateEndpoint = "/api/clients/me/accounts/";
    private String select = "daily";
    //private LinearLayout setupPart;
    ///private LinearLayout cancelPart;

    //turnoff part
   // private Button turnOffBillPaymentButton;
    private Spinner turnOffSpinner;
    //private Spinner cancelBillCreditSpinner;
    //String cancelOrSetup = "Setup Bill Payments";
    private Button cancelButton;
    private Button cancelButtonPopup;
    private AlertDialog.Builder dialogBuilder;
    private AlertDialog dialog;

    public BillPaymentFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment BillPaymentFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static BillPaymentFragment newInstance(String param1, String param2) {
        BillPaymentFragment fragment = new BillPaymentFragment();
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

        View view = inflater.inflate(R.layout.bill_payment_fragment, container, false);
        loginToken = getArguments().getString("loginToken");
        host = getArguments().getString("host");
        billPaymentSpinner = view.findViewById(R.id.billPaymentAccountSpinner);
        billPaymentAmount = view.findViewById(R.id.paymentAmount);
        setUpBillPaymentButton = view.findViewById(R.id.billPaymentButtonFragment);
        creditSpinner = view.findViewById(R.id.creditAccountSpinner);
        timePick =  view.findViewById(R.id.time);
        timePick.setIs24HourView(true);
        frequencySpinner = view.findViewById(R.id.frequencySpinner);
        dayOfMonthSpinner = view.findViewById(R.id.frequencySpinnerWeek);
        dayOfMonthSpinner = view.findViewById(R.id.frequencySpinnerDay);
        monthLayout = view.findViewById(R.id.monthLayout);
        weekLayout = view.findViewById(R.id.weekLayout);
        //setupPart = view.findViewById(R.id.setupPart);
        //cancelPart = view.findViewById(R.id.turnOffBillPaymentPart);

        DecimalDigitsInputFilter somethingFilter = new DecimalDigitsInputFilter(2);
        billPaymentAmount.setFilters(new InputFilter[]{somethingFilter});

        //cancel bill paymetn part
        //cancelBillCreditSpinner = view.findViewById(R.id.turnOffSpinner);
        //turnOffBillPaymentButton = view.findViewById(R.id.cancelBillPaymentButton);






        getAllAccounts();

        frequencySpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener()
        {
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id)
            {
                String selectedItem = parent.getItemAtPosition(position).toString();
                if(selectedItem.equals("Daily"))
                {
                    weekLayout.setVisibility(View.GONE);
                    monthLayout.setVisibility(View.GONE);
                    select = "daily";

                }
                else if(selectedItem.equals("Weekly")){
                    monthLayout = view.findViewById(R.id.monthLayout);
                    weekLayout = view.findViewById(R.id.weekLayout);
                    weekLayout.setVisibility(View.VISIBLE);
                    monthLayout.setVisibility(View.GONE);
                    select = "weekly";
                }
                else if(selectedItem.equals("Monthly")){
                    monthLayout = view.findViewById(R.id.monthLayout);
                    weekLayout = view.findViewById(R.id.weekLayout);
                    weekLayout.setVisibility(View.GONE);
                    monthLayout.setVisibility(View.VISIBLE);
                    select = "monthly";
                }
            } // to close the onItemSelected
            public void onNothingSelected(AdapterView<?> parent)
            {

            }
        });

        setUpBillPaymentButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(checkFields()) {
                    if (billPaymentSpinner.getSelectedItem() == null || creditSpinner.getSelectedItem() == null) {
                        Toast.makeText(getContext(), "No Accounts!", Toast.LENGTH_SHORT).show();

                    } else {
                        try {
                            setUpBillPayment();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }

            }
        });

        cancelButton = view.findViewById(R.id.cancelPaymentNotPopup);
        cancelButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                cancelPopup();


            }
        });















        return view;
    }

    public void setUpBillPayment() throws JSONException {

        RequestQueue queue = Volley.newRequestQueue(getContext());
        JSONObject params = new JSONObject();



        String spinnerSelect =billPaymentSpinner.getSelectedItem().toString();
        String onlyAcc = spinnerSelect.substring(spinnerSelect.indexOf(" ") + 1);
        params.put("accountNumber",onlyAcc);
        params.put("amount", Double.parseDouble(String.valueOf(billPaymentAmount.getText())));
        params.put("frequency", frequencySpinner.getSelectedItem().toString());
        params.put("minutes", timePick.getCurrentMinute());
        params.put("hour", timePick.getCurrentHour());

        if(select.equals("weekly")) {
            dayOfWeekSpinner= getView().findViewById(R.id.frequencySpinnerWeek);
            params.put("day_of_the_week", convertWeek(dayOfWeekSpinner.getSelectedItem().toString()));
        }
        if(select.equals("monthly")) {
            dayOfMonthSpinner= getView().findViewById(R.id.frequencySpinnerDay);
            params.put("day_of_the_month", Integer.parseInt(dayOfMonthSpinner.getSelectedItem().toString()));
        }


        final String requestBody = params.toString();

        System.out.println("requestBody: " + requestBody );
        String spinnerSelection =creditSpinner.getSelectedItem().toString();
        String onlyAccNum = spinnerSelection.substring(spinnerSelection.indexOf(" ") + 1);
        System.out.println("Credit #:" + onlyAccNum+"L");
        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.PATCH, host+automateEndpoint+onlyAccNum+"/automatepayment",null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Bundle responseBundle = new Bundle();
                responseBundle.putString("loginToken",loginToken);
                responseBundle.putString("host",host);
                Fragment responseFrag = new DashboardFragment();
                responseFrag.setArguments(responseBundle);
                loadFragment(responseFrag);
                Toast.makeText(getContext(),"Payment Successfully Setup!", Toast.LENGTH_SHORT).show();
                try {
                    JSONObject test = response.getJSONObject("account1");
                    JSONObject test2 = response.getJSONObject("account2");

                    printTest(test);
                    printTest(test2);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                //Toast.makeText(getContext(),"Account Added!", Toast.LENGTH_SHORT).show();
                //Log.i("VOLLEY", response.getJSONObject().toString());
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getContext(),"Error Setting Up Payment", Toast.LENGTH_SHORT).show();
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

        if(billPaymentAmount.length() == 0){
           billPaymentAmount.setError("This field is required!");
            return false;
        }




        return true;
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

    public void getAllAccounts(){
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
                    ArrayList<String> noCreditList = new ArrayList<>();
                    for(int i = 0; i < accountList.size(); i++){
                        if(accountList.get(i).getType().equalsIgnoreCase("credit")) {
                            noCreditList.add(accountList.get(i).getType() + ": " + accountList.get(i).getAccountNumber());
                        }
                        else{
                            accountNumberList.add(accountList.get(i).getType() + ": " + accountList.get(i).getAccountNumber());
                        }
                    }
                    ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_dropdown_item, accountNumberList);
                    arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    billPaymentSpinner.setAdapter(arrayAdapter);


                    ArrayAdapter<String> arrayAdapter2 = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_dropdown_item, noCreditList);
                    arrayAdapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    creditSpinner.setAdapter(arrayAdapter2);

                    if(turnOffSpinner != null) {
                        turnOffSpinner.setAdapter((arrayAdapter2));
                    }

                    //cancelBillCreditSpinner.setAdapter(arrayAdapter);



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
    }

    public int convertWeek(String day){
        int converted = 0;
        switch(day){

            case("Sunday"):
                converted = 0;
                break;
            case("Monday"):
                converted = 1;
                break;
            case("Tuesday"):
                converted = 2;
                break;
            case("Wednesday"):
                converted =3;
                break;
            case("Thursday"):
                converted = 4;
                break;
            case("Friday"):
                converted = 5;
                break;
            case("Saturday"):
                converted = 6;
                break;


        }


        return converted;
    }

    public void loadFragment(Fragment fragment){
        //((FragmentActivity)getContext()).getSupportFragmentManager().beginTransaction().remove(this).commit();
        ((FragmentActivity)getContext()).getSupportFragmentManager().beginTransaction().replace(R.id.dashboardLayout, fragment).commit();

    }

    public void printTest(JSONObject tempJSON) throws JSONException {

        System.out.println("bruh:" + tempJSON);

    }

    @SuppressLint("MissingInflatedId")
    public void cancelPopup(){
        dialogBuilder = new AlertDialog.Builder(getActivity());
        View updateView = getLayoutInflater().inflate(R.layout.cancel_bill_payments_layout,null);
        turnOffSpinner = updateView.findViewById(R.id.turnOffSpinner);
        cancelButtonPopup = updateView.findViewById(R.id.cancelBillPaymentButton);
        getAllAccounts();
        cancelButtonPopup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(turnOffSpinner.getSelectedItem() != null){
                    cancelBillPayments();
                }
                else {
                    Toast.makeText(getContext(), "No Credit Accounts!", Toast.LENGTH_SHORT).show();
                }
            }
        });



        dialogBuilder.setView(updateView);
        dialog = dialogBuilder.create();
        dialog.show();


    }
    public void cancelBillPayments(){

        RequestQueue queue = Volley.newRequestQueue(getContext());
        JSONObject params = new JSONObject();


        final String requestBody = params.toString();

        System.out.println("requestBody: " + requestBody );
        String spinnerSelection =turnOffSpinner.getSelectedItem().toString();
        String onlyAccNum = spinnerSelection.substring(spinnerSelection.indexOf(" ") + 1);
        System.out.println("Credit #:" + onlyAccNum+"L");
        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.PATCH, host+automateEndpoint+onlyAccNum+"/stopautomatedpayment",null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {

                Toast.makeText(getContext(),"Payment Successfully Stopped!", Toast.LENGTH_SHORT).show();
                dialog.dismiss();
                //Toast.makeText(getContext(),"Account Added!", Toast.LENGTH_SHORT).show();
                //Log.i("VOLLEY", response.getJSONObject().toString());
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getContext(),"Error Stopping Payment", Toast.LENGTH_SHORT).show();
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
}