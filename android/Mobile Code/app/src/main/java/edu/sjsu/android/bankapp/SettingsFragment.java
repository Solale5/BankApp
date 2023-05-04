package edu.sjsu.android.bankapp;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link SettingsFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class SettingsFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private String host;
    private String loginToken;
    final String logoutEndpoint = "/api/clients/logout";
    private Button logoutButton;
    private Button deleteUserButton;
    final String deleteUserEndpoint = "/api/clients/me";
    private TextView accountHeader;

    public SettingsFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment settings_fragment.
     */
    // TODO: Rename and change types and number of parameters
    public static SettingsFragment newInstance(String param1, String param2) {
        SettingsFragment fragment = new SettingsFragment();
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
        View view = inflater.inflate(R.layout.settings_fragment, container, false);
        loginToken = getArguments().getString("loginToken");
        host = getArguments().getString("host");

        accountHeader = getActivity().findViewById(R.id.accountHeader);
        accountHeader.setText("");

        logoutButton = view.findViewById(R.id.logOutButtonFragment);
        deleteUserButton = view.findViewById(R.id.deleteUserButtonFragment);


        logoutButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AlertDialog.Builder builder = new AlertDialog.Builder((getActivity()));
                builder.setMessage("Are you sure you want to logout?")
                        .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                signOut();
                            }
                        })
                        .setNegativeButton("No", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                //do nothing
                            }
                        });
                builder.show();


            }
        });


        deleteUserButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AlertDialog.Builder builder = new AlertDialog.Builder((getActivity()));
                builder.setMessage("Warning! Are you sure you want to delete your user from the bank?")
                        .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                               // deleteUser();
                            }
                        })
                        .setNegativeButton("No", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                //do nothing
                            }
                        });
                builder.show();


            }
        });




        return view;
    }

    public void signOut(){
        RequestQueue queue = Volley.newRequestQueue(getContext());
        JSONObject params = new JSONObject();
        try {
            params.put("token", loginToken);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        final String requestBody = params.toString();

        StringRequest jsonRequest = new StringRequest(Request.Method.POST, host+logoutEndpoint, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {

                logout();
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getContext(),"Error Logging Out!", Toast.LENGTH_SHORT).show();
                Log.e("VOLLEY", error.toString());
            }
        }) {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
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

    public void logout(){

        Intent logoutIntent = new Intent(getActivity(),MainActivity.class);
        startActivity(logoutIntent);
        getActivity().finish();

    }

    public void deleteUser(){

        RequestQueue queue = Volley.newRequestQueue(getContext());
        JSONObject params = new JSONObject();
        try {
            params.put("token", loginToken);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        final String requestBody = params.toString();

        StringRequest deleteRequest = new StringRequest(Request.Method.DELETE, host+deleteUserEndpoint, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                logout();
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getContext(),"Error Logging Out!", Toast.LENGTH_SHORT).show();
                Log.e("VOLLEY", error.toString());
                Log.i("VOLLEY", error.toString());
            }
        }) {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }


            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String>  params = new HashMap<String, String>();
                System.out.println("loginToken at delete: " + loginToken);
                params.put("Authorization", loginToken);


                return params;
            }


        };

        queue.add(deleteRequest);

    }
}