<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;
use Carbon\Carbon;

use App\Models\User;
use App\Models\Medication;
use App\Models\FileNumber;
use App\Models\Result;

class MedicalController extends Controller{
    
    public function AddMedicine(Request $request){

        try{
            $medicine = new Medication();

            $medicine->user_id = Auth::id();
            $medicine->name = $request->name;
            $medicine->dose_quantity = $request->dose_quantity;
            $medicine->price_per_month = $request->price_per_month;
            $medicine->instructions = $request->instructions;
            $medicine->days = $request->days;
            $medicine->timing = $request->timing;
            $medicine->first_of_each_month = $request->first_of_each_month;
            $medicine->on_demand = $request->on_demand;
            $medicine->month = $request->month;

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images', 'public');
                $medicine->image = str_replace('public/', 'storage/', $imagePath);
            }
            
            $medicine->save();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Medicine added successfully'
            ]);
        }catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while adding the medicine.' .$e->getMEssage()
            ]);
        }
        
    }

    public function DeleteMedicine(Request $request){

        try{
            $medicine = Medication::where('name', $request->name)
                                    ->where('dose_quantity', $request->dose_quantity)
                                    ->where('days', $request->days)
                                    ->where('timing', $request->timing)
                                    ->where('user_id', Auth::id())
                                    ->first();            
    
            if ($medicine->image) {
                $oldImagePath = storage_path('app/public/' . $medicine->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            if ($medicine) $medicine->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Medicine deleted successfully'
            ]);
        }catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting the medicine.'
            ]);
        }
        
    }

    public function GetMedications(Request $req){
        try{

            $user = auth()->user();
    
            $date = Carbon::parse($req->date); 
            $day = $req->day;
    
            $is_first_of_month = $date->day == 1;
            if ($is_first_of_month) {
                $medication = $user->medications()
                    ->where(function ($query) use ($day, $is_first_of_month) {
                        $query->where(function ($query) use ($day) {
                            $query->where('days', 'like', "%$day%")
                                ->orWhere('days', 'Everyday');
                        });
                        if ($is_first_of_month) {
                            $query->orWhere(function ($query) {
                                $query->where('first_of_each_month', true);
                            }); 
                        }
                    })
                    ->get();
            } else{
                $medication= $user->medications()->where('days', 'like', $day)->orWhere('days', 'Everyday')->get();
            }
    
            return response()->json([
                'status' => 'success',
                'message' => 'Medications returned successfully',
                'medications' => $medication
            ]);
    
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting the medicine of the selected day.'
            ]);
        }
    }

    public function AddFileNumber(Request $request){

        try{
            $file = new FileNumber();

            $file->user_id = Auth::id();
            $file->doctor_name = $request->doctor_name;
            $file->address = $request->address;
            $file->file_number = $request->file_number;
    
            $file->save();
    
            return response()->json([
                'status' => 'success',
                'message' => 'File number added successfully'
            ]);
        }catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while adding the file number.'
            ]);
        }
        
    }

    public function AddMedicalResult(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|mimes:pdf|max:2048',
                'testing_date' => 'required|date',
            ]);
    
            $file = $request->file('file');
            $fileName = uniqid() . '_' . $file->getClientOriginalName();
    
            $result = new Result();
    
            $result->user_id = Auth::id();
            $result->testing_date = $request->testing_date;
            $result->file_name = $fileName;
            $result->description = $request->description;
    
            $result->save();
    
            $file->storeAs('public/storage/images', $fileName);
    
            return response()->json([
                'status' => 'success',
                'message' => 'Medical Result added successfully'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while adding the medical result.'
            ]);
        }
    }
    

    public function GetMedicalResults()
    {
        try {
            $user = auth()->user();
            $results = $user->results;
    
            $formattedResults = $results->map(function ($result) {
                return [
                    'id' => $result->id,
                    'name' => $result->name,
                    'type' => $result->type,
                    'uri' => $result->file_name,
                    'testing_date' => $result->testing_date,
                    'description' => $result->description,
                    'file_name' => $result->file_name,
                ];
            });
    
            return response()->json([
                'status' => 'success',
                'message' => 'Results returned successfully',
                'results' => $formattedResults
            ]);
    
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting the results.'
            ]);
        }
    }
    

    public function GetFileNumbers(){

        try{

            $user = auth()->user();
            $file_numbers= $user->fileNumbers;  
    
            return response()->json([
                'status' => 'success',
                'message' => 'File numbers returned successfully',
                'file_numbers' => $file_numbers
            ]);
    
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting the file numbers.' 
            ]);
        }
    }

}