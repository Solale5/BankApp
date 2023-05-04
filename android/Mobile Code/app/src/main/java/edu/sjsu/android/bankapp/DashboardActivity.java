package edu.sjsu.android.bankapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Parcelable;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;


import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.bottomappbar.BottomAppBar;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.navigation.NavigationView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//can't double extend activity and appcompatactivity
public class DashboardActivity extends AppCompatActivity {
    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager layoutManager;
    private BottomNavigationView navigationView;
    private String loginToken;
    private String host;
    private boolean isManager = false;
    final String userEndPoint = "/api/clients/me";

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        loginToken = getIntent().getStringExtra("login-token");
        host = getIntent().getStringExtra("host");
        //System.out.println("login token: " + token);

        Bundle bundle = new Bundle();
        bundle.putString("loginToken",loginToken);
        bundle.putString("host",host);
        //testing for sending data

       // userBundle.put("data", testUser);




        //end of testing



        super.onCreate(savedInstanceState);
        isManager();


            setContentView(R.layout.dashboard_recycler_view);
            Fragment firstFrag = new DashboardFragment();
            firstFrag.setArguments(bundle);
            loadFragment(firstFrag);
            layoutManager = new LinearLayoutManager(this);
            navigationView = findViewById(R.id.bottomAppBar);

            //listeners for bottom nav bar to change fragment
            navigationView.setOnItemSelectedListener(item -> {
                Fragment fragment = null;
                switch (item.getItemId()) {
                    case R.id.dashboard:
                        fragment = new DashboardFragment();
                        break;
                    case R.id.settings:
                        fragment = new SettingsFragment();
                        break;

                    case R.id.account:
                        fragment = new AccountFragment();
                        break;

                    case R.id.transactions:

                        fragment = new TransactionsFragment();
                        break;

                    case R.id.atmlocator:
                        fragment = new AtmFragment();
                        break;



                }
                if (fragment != null) {
                    //checks if fragment exists
                    Bundle bundle2 = new Bundle();
                    bundle2.putString("loginToken", loginToken);
                    bundle2.putString("host", host);
                    fragment.setArguments(bundle2);
                    loadFragment(fragment);
                }

                return true;


            });



    }

    public void onClick (View view){
        switch(view.getId()){




        }
    }






    public void loadFragment(Fragment fragment){
        getSupportFragmentManager().beginTransaction().replace(R.id.dashboardLayout, fragment).commit();
    }

    public void isManager(){

        RequestQueue queue = Volley.newRequestQueue(DashboardActivity.this);
        JSONObject params = new JSONObject();

        final String requestBody = params.toString();

        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.GET, host+userEndPoint,null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {

                     Boolean manager = response.getBoolean("manager");
                     if(manager) {
                         Intent managerIntent = new Intent(DashboardActivity.this, ManagerActivity.class);
                         managerIntent.putExtra("login-token", loginToken);
                         managerIntent.putExtra("host", host);
                         startActivity(managerIntent);
                         finish();
                     }

                } catch (JSONException e) {
                    e.printStackTrace();
                }

            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(DashboardActivity.this,"Error Fetching Account!", Toast.LENGTH_SHORT).show();
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