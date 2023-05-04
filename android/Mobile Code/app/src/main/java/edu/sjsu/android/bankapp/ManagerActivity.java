package edu.sjsu.android.bankapp;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class ManagerActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager layoutManager;
    private BottomNavigationView navigationView;
    private String loginToken;
    private String host;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        loginToken = getIntent().getStringExtra("login-token");
        host = getIntent().getStringExtra("host");
        //System.out.println("login token: " + token);


        //testing for sending data

        // userBundle.put("data", testUser);




        //end of testing



        super.onCreate(savedInstanceState);
        setContentView(R.layout.manager_page);
        Bundle bundle = new Bundle();
        bundle.putString("loginToken",loginToken);
        bundle.putString("host",host);

        Fragment firstFrag = new ManagerFragment();
        firstFrag.setArguments(bundle);
        loadFragment(firstFrag);
        layoutManager = new LinearLayoutManager(this);
        navigationView = findViewById(R.id.bottomAppBarManager);

        //listeners for bottom nav bar to change fragment
        navigationView.setOnItemSelectedListener(item-> {
            Fragment fragment = null;
            switch(item.getItemId()) {
                case R.id.dashboardManager:
                    fragment = new ManagerFragment();
                    break;
                case R.id.settingsManager:
                    fragment = new ManagerSettingsFragment();
                    break;

            }
            if(fragment !=null){
                //checks if fragment exists
                Bundle bundle2 = new Bundle();
                bundle2.putString("loginToken",loginToken);
                bundle2.putString("host",host);
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
        getSupportFragmentManager().beginTransaction().replace(R.id.managerLayout, fragment).commit();
    }





}
