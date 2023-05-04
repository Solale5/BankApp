package edu.sjsu.android.bankapp;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.provider.MediaStore;
import android.text.InputFilter;
import android.text.Spanned;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link ImageDepositFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class ImageDepositFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private ImageView imageDepositView;
    private Button uploadImageButton;
    private Button depositButton;
    private String loginToken;
    private String host;
    private Spinner depositAccountSpinner;
    private EditText depositAmount;
    private final int GALLERY_REQ_CODE = 1000;
    final String depositEndpoint = "/api/clients/me/accounts/";
    final String allAccountsEndpoint = "/api/clients/me/accounts";

    public ImageDepositFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment ImageDepositFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static ImageDepositFragment newInstance(String param1, String param2) {
        ImageDepositFragment fragment = new ImageDepositFragment();
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
        View view =  inflater.inflate(R.layout.image_deposit_fragment, container, false);
        loginToken = getArguments().getString("loginToken");
        host = getArguments().getString("host");

        imageDepositView = view.findViewById(R.id.imageDepositView);
        uploadImageButton = view.findViewById(R.id.uploadImageButton);
        depositButton = view.findViewById(R.id.depositButton);
        depositAccountSpinner = view.findViewById(R.id.depositAccountSpinner);
        depositAmount = view.findViewById(R.id.imageDepositAmount);
        DecimalDigitsInputFilter somethingFilter = new DecimalDigitsInputFilter(2);
        depositAmount.setFilters(new InputFilter[]{somethingFilter});

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
                        //if(!accountList.get(i).getType().equalsIgnoreCase("credit")) {
                            accountNumberList.add(accountList.get(i).getType() + ": " + accountList.get(i).getAccountNumber());
                       // }
                    }
                    ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_dropdown_item, accountNumberList);
                    arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    depositAccountSpinner.setAdapter(arrayAdapter);



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

        ActivityResultLauncher<Intent> someActivityResultLauncher = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                result -> {
                    if (result.getResultCode() == Activity.RESULT_OK) {
                        // There are no request codes

                        imageDepositView.getLayoutParams().height = 500;
                        imageDepositView.getLayoutParams().width = 500;
                            imageDepositView.setImageURI(result.getData().getData());



                    }
                });

        uploadImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent image = new Intent(Intent.ACTION_PICK);
                image.setData(MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                someActivityResultLauncher.launch(image);

            }
        });

        depositButton.setOnClickListener((new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(checkFields()){
                    try {
                        if(depositAccountSpinner.getSelectedItem() == null){
                            Toast.makeText(getContext(),"No Accounts!",Toast.LENGTH_SHORT ).show();

                        }
                        else {
                            depositMoney();
                        }
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                }


            }
        }));




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

    public boolean checkFields(){
        if(depositAmount.length() == 0){
            depositAmount.setError("This field is required!");
            return false;
        }
        if(imageDepositView.getDrawable() == null){
            Toast.makeText(getContext(), "Check Image required!", Toast.LENGTH_SHORT).show();
            return false;
        }


        return true;
    }

    public void loadFragment(Fragment fragment){
        //((FragmentActivity)getContext()).getSupportFragmentManager().beginTransaction().remove(this).commit();
        ((FragmentActivity)getContext()).getSupportFragmentManager().beginTransaction().replace(R.id.dashboardLayout, fragment).commit();

    }

    public void depositMoney() throws JSONException {

        RequestQueue queue = Volley.newRequestQueue(getContext());
        JSONObject params = new JSONObject();

        params.put("balance", Double.parseDouble(String.valueOf(depositAmount.getText())));
        params.put("description", "Deposit into Account");


        final String requestBody = params.toString();
        String spinnerSelection = depositAccountSpinner.getSelectedItem().toString();
        String onlyAccNum = spinnerSelection.substring(spinnerSelection.indexOf(" ") + 1);

        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.PATCH, host+depositEndpoint+onlyAccNum+"/deposit",null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Bundle responseBundle = new Bundle();
                responseBundle.putString("loginToken",loginToken);
                responseBundle.putString("host",host);
                Fragment responseFrag = new DashboardFragment();
                responseFrag.setArguments(responseBundle);
                loadFragment(responseFrag);
                Toast.makeText(getContext(),"Money Successfully Deposited", Toast.LENGTH_SHORT).show();
                //Toast.makeText(getContext(),"Account Added!", Toast.LENGTH_SHORT).show();
                //Log.i("VOLLEY", response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getContext(),"Error Depositing!", Toast.LENGTH_SHORT).show();
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

