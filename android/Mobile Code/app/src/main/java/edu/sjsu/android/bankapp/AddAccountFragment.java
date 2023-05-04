package edu.sjsu.android.bankapp;

import android.annotation.SuppressLint;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
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

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link AddAccountFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class AddAccountFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private String loginToken;
    private String host;
    private Spinner accountTypeSpinner;
    private String accType;
    private Button addAccountButton;
    final String addAccountEndpoint = "/api/clients/me/accounts";


    public AddAccountFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment AddAccountFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static AddAccountFragment newInstance(String param1, String param2) {
        AddAccountFragment fragment = new AddAccountFragment();
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
        loginToken = getArguments().getString("loginToken");
        host = getArguments().getString("host");

        View view = inflater.inflate(R.layout.add_account_fragment, container, false);
        accountTypeSpinner = view.findViewById(R.id.addAccountSpinner);

        addAccountButton = view.findViewById(R.id.addAccountButtonInsideFragment);
        addAccountButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                try {
                    addAccount(accountTypeSpinner.getSelectedItem().toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                }


            }
        });



        return view;
    }


    public void addAccount(String accountType) throws JSONException {

        RequestQueue queue = Volley.newRequestQueue(getContext());
        JSONObject params = new JSONObject();
        params.put("token", loginToken);
        params.put("type",accountType);
        params.put("balance", 0);

        final String requestBody = params.toString();

        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, host+addAccountEndpoint,null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Bundle responseBundle = new Bundle();
                responseBundle.putString("loginToken",loginToken);
                responseBundle.putString("host",host);
                Fragment responseFrag = new DashboardFragment();
                responseFrag.setArguments(responseBundle);
                loadFragment(responseFrag);
                Toast.makeText(getContext(),"Account Added!", Toast.LENGTH_SHORT).show();
                //Log.i("VOLLEY", response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getContext(),"Error Adding Account!", Toast.LENGTH_SHORT).show();
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

    public void loadFragment(Fragment fragment){
        ((FragmentActivity)getContext()).getSupportFragmentManager().beginTransaction().replace(R.id.dashboardLayout, fragment).commit();

    }

}