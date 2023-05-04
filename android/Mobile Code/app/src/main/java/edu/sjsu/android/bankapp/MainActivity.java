package edu.sjsu.android.bankapp;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import android.annotation.SuppressLint;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ProgressBar;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {
    private AlertDialog.Builder dialogBuilder;
    private AlertDialog dialog;

    private Button signupButton;
    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager layoutManager;

    //popup fields
    private EditText nameField;
    private EditText emailField;
    private EditText recoveryEmailField;
    private EditText passwordField;
    private EditText phoneField;
    private EditText addressField;
    private EditText cityField;
    private EditText securityQuestionAnswerField;
    private EditText dobField;
    private Spinner securityQuestionSpinner;
    private EditText zipcodeField;
    private Spinner stateSpinner;
    private ImageButton createAccountButton;
    private Boolean dobChecker = false;


    //signin fields
    private EditText username;
    private EditText password;
    private EditText answer;


    //CONNECTION
    // host + endpoint = link
    final String signUpEndpoint = "/api/clients/signup";
    final String loginEndpoint = "/api/clients/login";

    //CHANGE THIS WHEN WORKING WITH EITHER LOCALHOST OR SERVER

    //local for emulator might need to change
    //private String host = "http://10.0.2.2:5001";

    //server
    private String host = "https://bankapp-production-fd9e.up.railway.app";

    private ProgressBar loadingPB;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        if (dialog != null) {
            dialog.dismiss();
            dialog.cancel();
        }

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);



    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event)
    {
        //replaces the default 'Back' button action
        if(keyCode==KeyEvent.KEYCODE_BACK)   {
// something here
            onBackPressed();
        }
        return true;
    }

    @Override
    public void onBackPressed() {
        // super.onBackPressed();
        Toast.makeText(this, "nah", Toast.LENGTH_SHORT).show();
        return;
    }


    public void onClick (View view) throws JSONException {

        switch(view.getId()){

            case R.id.loginButton:
                signIn();
                break;


            case R.id.signUpButton:

                signUpDialog();
                break;



        }
    }

    public boolean isEnabled(int position){
        if (position == 0){
            return false;
        }
        else{
            return true;
        }
    }

    @SuppressLint("MissingInflatedId")
    public void signUpDialog(){
        dialogBuilder = new AlertDialog.Builder(this);
        final View signUpView = getLayoutInflater().inflate(R.layout.signup_popup,null);

        nameField = signUpView.findViewById(R.id.nameregister);
        emailField = signUpView.findViewById(R.id.emailregister);
        recoveryEmailField = signUpView.findViewById(R.id.recoveryEmailRegister);
        passwordField = signUpView.findViewById(R.id.passwordregister);
        phoneField = signUpView.findViewById(R.id.phoneregister);
        addressField = signUpView.findViewById(R.id.streetRegister);
        cityField = signUpView.findViewById(R.id.cityRegister);
        zipcodeField = signUpView.findViewById(R.id.zipcoderegister);
        securityQuestionAnswerField = signUpView.findViewById(R.id.securityQuestionAnswer);

        dobField = signUpView.findViewById(R.id.dobTextView);
        securityQuestionSpinner = signUpView.findViewById(R.id.securityquestionsspinner);
        stateSpinner = signUpView.findViewById(R.id.stateSpinner);
        createAccountButton = signUpView.findViewById(R.id.createaccountbutton);

        createAccountButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(checkPopUpFields()){
                    dialog.dismiss();
                    try {
                        registerUser(nameField.getText().toString(), dobField.getText().toString(),
                                passwordField.getText().toString(), securityQuestionSpinner.getSelectedItem().toString(),
                                securityQuestionAnswerField.getText().toString(), phoneField.getText().toString(),
                                emailField.getText().toString(),recoveryEmailField.getText().toString(),
                                addressField.getText().toString(),cityField.getText().toString(),stateSpinner.getSelectedItem().toString(),zipcodeField.getText().toString());
                    } catch (AuthFailureError | JSONException e) {
                        e.printStackTrace();
                    }


                }
            }
        });

        //show calendar picker
        dobField.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final Calendar c = Calendar.getInstance();

                int year = c.get(Calendar.YEAR);
                int month = c.get(Calendar.MONTH);
                int day = c.get(Calendar.DAY_OF_MONTH);

                DatePickerDialog datePickerDialog = new DatePickerDialog(

                        MainActivity.this,
                        new DatePickerDialog.OnDateSetListener() {
                            @Override
                            public void onDateSet(DatePicker view, int year,
                                                  int month, int dayOfMonth) {
                                if(yearCheck(year, c.get(Calendar.YEAR))) {

                                    dobField.setText((year % 100) + "/" + (month + 1) + "/" + dayOfMonth);
                                    dobField.setError(null);
                                    dobChecker = true;
                                }
                                else{
                                    dobField.setError("Invalid Date of Birth");
                                    dobField.setText("yy/mm/dd");
                                    dobChecker = false;
                                }

                            }
                        },

                        year, month, day);

                datePickerDialog.show();
            }
        });



        dialogBuilder.setView(signUpView);
        dialog = dialogBuilder.create();
        dialog.show();


    }

    public boolean yearCheck(int year, int currentYear){

        if(currentYear - year < 16){
            return false;
        }


        return true;
    }

    public void signIn() throws JSONException {
        username = findViewById(R.id.usernameLogin);
        password =findViewById(R.id.passwordLogin);
        answer= findViewById(R.id.securityAnswerLogin);
        //Dashboard activity is the page after login
        Intent loginIntent = new Intent(this,DashboardActivity.class);
        Intent managerIntent = new Intent(this,ManagerActivity.class);

        if(signInFieldCheck()) {
            RequestQueue queue = Volley.newRequestQueue(this);
            JSONObject params = new JSONObject();

            params.put("email",username.getText());
            params.put("password",password.getText());
            //to this
            params.put("securityAnswer",answer.getText());

            final String requestBody = params.toString();

            JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, host+loginEndpoint,null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    //seems to work here?
                    Toast.makeText(MainActivity.this,"Login Successful", Toast.LENGTH_SHORT).show();
                    try {

                        String loginToken = response.getString("token");
                        System.out.println("Before: " + loginToken);
                        loginIntent.putExtra("login-token",loginToken);
                        loginIntent.putExtra("host", host);
                        startActivity(loginIntent);
                        finish();
                       // }
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                   // Log.i("VOLLEY", response);


                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(MainActivity.this,"Invalid Login Credentials", Toast.LENGTH_SHORT).show();
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

                //idk what dis does
//                @Override
//                protected Response<JSONObject> parseNetworkResponse(NetworkResponse response) {
//                    String responseString = "";
//
//                    if (response != null) {
//                        responseString = String.valueOf(response.statusCode);
//                        // can get more details such as response.headers
//
//
//                    }
//                    return Response.success(responseString, HttpHeaderParser.parseCacheHeaders(response));
//                }
            };

            queue.add(jsonRequest);

        }
    }

    public void registerUser(String nameReg, String dobReg, String passwordReg, String sq,
                             String sqAnswer, String phoneNumber, String email, String rEmail,
                             String address, String city, String state,String zipcode ) throws AuthFailureError, JSONException {
        // creating a new variable for our request queue
        //loadingPB.setVisibility(View.VISIBLE);
        RequestQueue queue = Volley.newRequestQueue(this);
        JSONObject params = new JSONObject();
        params.put("name", nameReg);
        params.put("dob", dobReg);
        params.put("password",passwordReg);
        params.put("securityQuestion",sq);
        params.put("securityAnswer",sqAnswer);
        params.put("phoneNumber",phoneNumber);
        params.put("email",email);
        params.put("recoveryEmail",rEmail);
        params.put("street",address);
        //zip code do
        params.put("zipcode",zipcode);
        params.put("city", city);
        params.put("state", state);



        final String requestBody = params.toString();

        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, host+signUpEndpoint,null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Toast.makeText(MainActivity.this,"Account Created", Toast.LENGTH_SHORT).show();
                //Log.i("VOLLEY", response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(MainActivity.this,"Error creating your account! Please try again.", Toast.LENGTH_SHORT).show();
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


        };

        queue.add(jsonRequest);



    }





    public boolean checkPopUpFields(){
        //could be optimized
        if(nameField.length() == 0){
            nameField.setError("This field is required!");
            return false;
        }

        if(emailField.length() == 0){
            emailField.setError("Email is required!");
            return false;
        }

        if(recoveryEmailField.length() == 0){
            recoveryEmailField.setError("Recovery email is required!");
            return false;
        }

        if(passwordField.length() < 6){
            passwordField.setError("Invalid Password Length!");
            return false;
        }

        if(phoneField.length() != 10){
            phoneField.setError("Invalid Phone Number!");
            return false;
        }


        if(addressField.length() == 0){
            addressField.setError("Street address is required!");
            return false;
        }

        if(cityField.length() == 0){
            cityField.setError("City name is required!");
            return false;
        }
        if(dobField.length() == 0 || dobChecker != true){
            dobField.setError("Date of birth is required!");
            return false;
        }

        if(zipcodeField.length() != 5){
            zipcodeField.setError("Invalid zip code!");
            return false;
        }

        if(securityQuestionAnswerField.length() == 0){
            securityQuestionAnswerField.setError("Answer is required!");
            return false;
        }







        return true;
    }


    public boolean signInFieldCheck(){
        if(username.length() == 0){
            username.setError("Username is required!");
            return false;
        }

        if(password.length() == 0){
            password.setError("Password is required!");
            return false;
        }

        if(answer.length() == 0){
            answer.setError("Answer is required!");
            return false;
        }

        return true;

    }




}