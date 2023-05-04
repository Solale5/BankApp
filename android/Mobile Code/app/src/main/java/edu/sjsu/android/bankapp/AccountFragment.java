package edu.sjsu.android.bankapp;

import android.annotation.SuppressLint;
import android.os.Bundle;

import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
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
import java.util.HashMap;
import java.util.Map;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link AccountFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class AccountFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private TextView accountName;
    private TextView accountEmail;
    private TextView accountAddress;
    private TextView profileEmail;
    private TextView accountState;
    private TextView accountCity;
    private TextView accountPhone;
    private TextView accountZip;
    private AlertDialog.Builder dialogBuilder;
    private AlertDialog dialog;
    private String select = "phoneNumber";


    private String loginToken;
    private String host;
    final String profileEndpoint = "/api/clients/me";
    private TextView accountHeader;
    private Button updateUserButton;
    private Button updateUserButtonPopup;


    //update popup fields
    private Spinner updateSelectionSpinner;
    private Spinner updateStateSpinner;
    private EditText stringUpdateText;
    private EditText numberUpdateText;




    public AccountFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment BlankFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static AccountFragment newInstance(String param1, String param2) {
        AccountFragment fragment = new AccountFragment();
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
        View view = inflater.inflate(R.layout.accountfragment, container, false);

        accountHeader = getActivity().findViewById(R.id.accountHeader);
        accountHeader.setText("");


        accountName = view.findViewById(R.id.profileHeader);
        accountEmail = view.findViewById(R.id.profileEmail);
        accountAddress = view.findViewById(R.id.profileAddress);
        profileEmail = view.findViewById(R.id.profileEmail);
        accountState = view.findViewById(R.id.profileState);
        accountCity = view.findViewById(R.id.profileCity);
        accountPhone = view.findViewById(R.id.profilePhone);
        accountZip = view.findViewById(R.id.profileZip);
        loginToken = getArguments().getString("loginToken");
        host = getArguments().getString("host");
        RequestQueue queue = Volley.newRequestQueue(getContext());
        JSONObject params = new JSONObject();

        final String requestBody = params.toString();

        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.GET, host+profileEndpoint,null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    accountName.setText(response.getString("name") + "'s Profile");
                    profileEmail.setText("Email: " + response.getString("email"));
                    accountPhone.setText("Phone Number: " + response.getInt("phoneNumber"));
                    accountAddress.setText("Address: " + response.getString("street"));
                    accountState.setText("State: " + response.getString("state"));
                    accountCity.setText("City: " + response.getString("city"));
                    accountZip.setText("ZIP Code: " + response.getString("zipcode"));




                } catch (JSONException e) {
                    e.printStackTrace();
                }

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

        updateUserButton = view.findViewById((R.id.updateUserButton));
        updateUserButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                updatePopup();



                updateUserButtonPopup.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                        switch(select){
                            case "phoneNumber":

                                try {
                                    if(checkFields()) {
                                        updateInformation(select, numberUpdateText.getText().toString());
                                        dialog.dismiss();


                                    }
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                break;

                            case "street":
                                try {
                                    if(checkFields()) {
                                        updateInformation(select, stringUpdateText.getText().toString());
                                        dialog.dismiss();



                                    }
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                break;

                            case "city":
                                try {
                                    if(checkFields()) {
                                        updateInformation(select, stringUpdateText.getText().toString());
                                        dialog.dismiss();

                                    }
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                break;

                            case "state":
                                try {
                                    updateInformation(select, updateStateSpinner.getSelectedItem().toString());
                                    dialog.dismiss();




                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                break;
                        }



                    }
                });

            }
        });




        return view;
    }



    public void updatePopup(){

        dialogBuilder = new AlertDialog.Builder(getActivity());
        View updateView = getLayoutInflater().inflate(R.layout.update_user_string_popup,null);
        updateSelectionSpinner = updateView.findViewById(R.id.updateUserSpinner);
        updateUserButtonPopup = updateView.findViewById(R.id.updateUserButtonPopup);


        updateSelectionSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener()
        {
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id)
            {
                String selectedItem = parent.getItemAtPosition(position).toString();
                if(selectedItem.equals("Phone Number"))
                {
                    numberUpdateText = updateView.findViewById(R.id.updateNumberEditText);
                    stringUpdateText = updateView.findViewById(R.id.updateStringEditText);
                    updateStateSpinner =  updateView.findViewById(R.id.updateStateSpinner);
                    numberUpdateText.setVisibility(View.VISIBLE);
                    stringUpdateText.setVisibility(View.GONE);
                    updateStateSpinner.setVisibility(View.GONE);
                    select = "phoneNumber";

                }
                else if(selectedItem.equals("Address")){
                    numberUpdateText =  updateView.findViewById(R.id.updateNumberEditText);
                    stringUpdateText =  updateView.findViewById(R.id.updateStringEditText);
                    updateStateSpinner =  updateView.findViewById(R.id.updateStateSpinner);
                    numberUpdateText.setVisibility(View.GONE);
                    stringUpdateText.setVisibility(View.VISIBLE);
                    updateStateSpinner.setVisibility(View.GONE);
                    select = "street";
                }
                else if(selectedItem.equals("City")){
                    numberUpdateText =  updateView.findViewById(R.id.updateNumberEditText);
                    stringUpdateText =  updateView.findViewById(R.id.updateStringEditText);
                    updateStateSpinner =  updateView.findViewById(R.id.updateStateSpinner);
                    numberUpdateText.setVisibility(View.GONE);
                    stringUpdateText.setVisibility(View.VISIBLE);
                    updateStateSpinner.setVisibility(View.GONE);
                    select = "city";
                }
                else if(selectedItem.equals("State")){
                    numberUpdateText =  updateView.findViewById(R.id.updateNumberEditText);
                    stringUpdateText = updateView.findViewById(R.id.updateStringEditText);
                    updateStateSpinner =  updateView.findViewById(R.id.updateStateSpinner);
                    numberUpdateText.setVisibility(View.GONE);
                    stringUpdateText.setVisibility(View.GONE);
                    updateStateSpinner.setVisibility(View.VISIBLE);
                    select = "state";
                }




            } // to close the onItemSelected
            public void onNothingSelected(AdapterView<?> parent)
            {

            }
        });
        dialogBuilder.setView(updateView);
        dialog = dialogBuilder.create();
        dialog.show();

    }

    public void updateInformation(String selection, String value) throws JSONException {


        RequestQueue queue = Volley.newRequestQueue(getContext());
        JSONObject params = new JSONObject();
        params.put(selection,value);

        final String requestBody = params.toString();

        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.PATCH, host+profileEndpoint,null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Toast.makeText(getContext(),"Successfully Updated Info!", Toast.LENGTH_SHORT).show();



            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getContext(),"Error Fetching Updating Info!", Toast.LENGTH_SHORT).show();
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

        switch(select){
            case "phoneNumber":
                if(numberUpdateText.length() < 10){
                    numberUpdateText.setError("Invalid phone number!");
                    return false;
                }

                break;

            case "street":
                if(stringUpdateText.length() == 0){
                   stringUpdateText.setError("Field Required!");
                   return false;
                }
                break;

            case "city":
                if(stringUpdateText.length() == 0){
                    stringUpdateText.setError("Field Required!");
                    return false;
                }

                break;

        }


        return true;
    }

    public void reloadFragment(){

        final FragmentTransaction ft = getParentFragmentManager().beginTransaction();
        ft.detach(this).attach(this).commit();
    }
}