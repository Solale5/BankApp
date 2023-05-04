package edu.sjsu.android.bankapp;

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
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link ManagerSettingsFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class ManagerSettingsFragment extends Fragment {

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
    private Button logoutButtonManager;
    private Button deleteUserButtonManager;
    final String deleteUserEndpoint = "/api/clients/me";
    private TextView accountHeaderManager;

    public ManagerSettingsFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment ManagerSettingsFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static ManagerSettingsFragment newInstance(String param1, String param2) {
        ManagerSettingsFragment fragment = new ManagerSettingsFragment();
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
        View view = inflater.inflate(R.layout.manager_settings_fragment, container, false);

        loginToken = getArguments().getString("loginToken");
        host = getArguments().getString("host");



        logoutButtonManager = view.findViewById(R.id.logOutButtonManager);

        logoutButtonManager.setOnClickListener(new View.OnClickListener() {
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


}