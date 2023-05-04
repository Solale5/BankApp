package edu.sjsu.android.bankapp;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
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
import com.google.android.material.bottomnavigation.BottomNavigationView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link DashboardFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class DashboardFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager layoutManager;
    private String loginToken;
    private String host;
    final String allAccountsEndpoint = "/api/clients/me/accounts";
    final String profileEndpoint = "/api/clients/me";
    public JSONArray accounts = new JSONArray();
    private ArrayList<Account> returnAccounts = new ArrayList<>();
    private View somethingView;
    private TextView accountName;

    public DashboardFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment DashboardFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static DashboardFragment newInstance(String param1, String param2) {
        DashboardFragment fragment = new DashboardFragment();
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
        //note: bundle account info into here

        loginToken = getArguments().getString("loginToken");
        host = getArguments().getString("host");
        accountName = getActivity().findViewById(R.id.accountHeader);


        View view = inflater.inflate(R.layout.fragment_dashboard, container, false);
        getCustomerName();

        BottomNavigationView bottomNav = getActivity().findViewById(R.id.bottomAppBar);
        if(R.id.dashboard != bottomNav.getSelectedItemId()) {
            bottomNav.setSelectedItemId(R.id.dashboard);
        }


        RequestQueue queue = Volley.newRequestQueue(getContext());
        JSONObject params = new JSONObject();

        final String requestBody = params.toString();

        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.GET, host+allAccountsEndpoint,null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    JSONArray temp = response.getJSONArray("accounts");


                    somethingView = view;
                    recyclerView = (RecyclerView) view.findViewById(R.id.my_recycler_view);
                    recyclerView.setHasFixedSize(true);
                    layoutManager = new LinearLayoutManager(view.getContext());
                    recyclerView.setLayoutManager(layoutManager);
                    mAdapter= new DashboardAdapter(view.getContext(),parseAccounts(temp),host,loginToken);
                    recyclerView.setAdapter(mAdapter);



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

    public void getCustomerName(){
        RequestQueue queue = Volley.newRequestQueue(getContext());
        JSONObject params = new JSONObject();

        final String requestBody = params.toString();

        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.GET, host+profileEndpoint,null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    accountName.setText("Welcome " + response.getString("name"));

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
    }

}