package edu.sjsu.android.bankapp;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
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
 * Use the {@link ManagerFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class ManagerFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private String host;
    private String loginToken;
    final String adminEndpoint = "/api/clients/me/reports";

    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager layoutManager;
    private View somethingView;

    public ManagerFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment ManagerFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static ManagerFragment newInstance(String param1, String param2) {
        ManagerFragment fragment = new ManagerFragment();
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

        loginToken = getArguments().getString("loginToken");
        host = getArguments().getString("host");

        View view = inflater.inflate(R.layout.manager_fragment, container, false);
        RequestQueue queue = Volley.newRequestQueue(getContext());
        JSONObject params = new JSONObject();

        final String requestBody = params.toString();

        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.GET, host+adminEndpoint,null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {

                    somethingView = view;
                    recyclerView = (RecyclerView) somethingView.findViewById(R.id.manager_recycler_view);
                    recyclerView.setHasFixedSize(true);
                    layoutManager = new GridLayoutManager(somethingView.getContext(),2);
                    recyclerView.setLayoutManager(layoutManager);
                    mAdapter= new ManagerAdapter(view.getContext(),parseReport(response),host,loginToken);
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

    public ArrayList<ManagerReport> parseReport(JSONObject object) throws JSONException {
        ArrayList<ManagerReport> reportList = new ArrayList<>();
        System.out.println("num users" + object.getInt("number_of_users"));
        ManagerReport one = new ManagerReport("# of Users",object.getInt("number_of_users"));
        ManagerReport two = new ManagerReport("# of Accounts",object.getInt("number_of_accounts"));
        ManagerReport three = new ManagerReport("Total Balance",object.getDouble("total_balance"));
        ManagerReport four = new ManagerReport("Avg. Balance",object.getDouble("average_balance"));
        ManagerReport five = new ManagerReport("# of Transactions", object.getInt("total_number_of_transactions"));
        ManagerReport six = new ManagerReport("# of Deposits",object.getInt("num_deposit"));
        ManagerReport seven = new ManagerReport("# of Withdraws",object.getInt("num_withdraw"));
        ManagerReport eight = new ManagerReport("# of Transfers",object.getInt("num_transfer"));

        reportList.add(one);
        reportList.add(two);
        reportList.add(three);
        reportList.add(four);
        reportList.add(five);
        reportList.add(six);
        reportList.add(seven);
        reportList.add(eight);
        return reportList;
    }

}