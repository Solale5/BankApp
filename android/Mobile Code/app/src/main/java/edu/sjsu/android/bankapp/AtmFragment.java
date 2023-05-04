package edu.sjsu.android.bankapp;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class AtmFragment extends Fragment implements OnMapReadyCallback {

    private MapView mMapView;
    private GoogleMap mMap;
    private EditText mSearchEditText;
    private Context mContext;
    private TextView accountHeader;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_atm, container, false);
        accountHeader = getActivity().findViewById(R.id.accountHeader);
        accountHeader.setText("");
        mContext = getActivity();
        mSearchEditText = rootView.findViewById(R.id.search_edit_text);
        mMapView = rootView.findViewById(R.id.map_view);
        mMapView.onCreate(savedInstanceState);
        mMapView.getMapAsync(this);
        Button searchButton = rootView.findViewById(R.id.search_button);
        searchButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mMap.clear();
                onSearchButtonClick(v);
            }
        });


        return rootView;
    }


    @Override
    public void onMapReady(GoogleMap googleMap) {
//        mHandler = new Handler(Looper.getMainLooper());
        mMap = googleMap;

        //default should be here
        LatLng LOCATION_CITY = new LatLng(37.3387, -121.8853);


        CameraUpdate update = CameraUpdateFactory.newLatLngZoom(LOCATION_CITY, 15);
        mMap.moveCamera(update);
        mMap.setOnMapClickListener(new GoogleMap.OnMapClickListener() {

            public void onMapClick(LatLng latLng) {
                //mMap.clear();
                //mMap.addMarker(new MarkerOptions().position(latLng));
            }
        });
    }

    public void onSearchButtonClick(View view) {
        String searchString = mSearchEditText.getText().toString();
        Log.d("MapsActivity", "Search string: " + searchString);

        // Use Geocoder to get the latitude and longitude of the search string
        // ...

        OkHttpClient client = new OkHttpClient();

        // Create JSON object with search string
        JSONObject jsonBody = new JSONObject();
        try {
            jsonBody.put("address", searchString);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        // Build the request with the url and JSON body
        RequestBody requestBody = RequestBody.create(MediaType.parse("application/json"), jsonBody.toString());
        Request request = new Request.Builder()
                .url("https://bankapp-production-fd9e.up.railway.app/atms")
                .post(requestBody)
                .build();

        // Send the request and process the response
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {

                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        String responseBody = null;
                        try {
                            responseBody = response.body().string();
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                        Log.d("MapsActivity", "Response body: " + responseBody);

                        String jsonString = responseBody;
                        // Create a JSON array from the JSON string
                        JSONArray jsonArray = null;
                        try {
                            jsonArray = new JSONArray(jsonString);
                        } catch (JSONException e) {
                            Log.e("MapsActivity", "Error parsing JSON array", e);
                            return;
                        }

                        boolean firstMarker = true;
                        for (int i = 0; i < jsonArray.length(); i++) {
                            // Get the latitude and longitude from the current JSON object
                            // Get the latitude and longitude from the current JSON object
                            JSONObject jsonObject = null;
                            try {
                                jsonObject = jsonArray.getJSONObject(i);
                                double lat = jsonObject.getDouble("lat");
                                double lng = jsonObject.getDouble("lng");

                                // Create a MarkerOptions object
                                MarkerOptions markerOptions = new MarkerOptions().position(new LatLng(lat, lng));

                                // Change the appearance of the first marker
                                if (firstMarker) {
                                    markerOptions.icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_BLUE));
                                    firstMarker = false;
                                }

                                // Add the marker to the map
                                mMap.addMarker(markerOptions);

                                // Zoom on the first marker
                                if (i == 0) {
                                    mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(lat, lng), 10));
                                }

                            } catch (JSONException e) {
                                Log.e("MapsActivity", "Error parsing JSON object at index " + i, e);
                            }
                        }

                    }
                });
// Iterate over the JSON array and add markers to the map


// Create a JSO
            }

            // Convert JSON response to ATMResponse object using Gson
//                Gson gson = new Gson();
//                 atmResponse = gson.fromJson(responseBody, ATMResponse.class);

            // Once you have the latitude and longitude, move the camera to that location
            // ...
            //LatLng searchLatLng = new LatLng(latitude, longitude);
            //mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(searchLatLng, 15));
            //mMap.clear();

        });
    }


    @Override
    public void onResume() {
        super.onResume();
        mMapView.onResume();
    }

    @Override
    public void onPause() {
        super.onPause();
        mMapView.onPause();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mMapView.onDestroy();
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        mMapView.onLowMemory();
    }


}
