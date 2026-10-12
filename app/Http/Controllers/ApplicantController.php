<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplicantRequest;
use App\Models\Applicant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ApplicantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $pending = Applicant::with('user')->where('status', 'P')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(6)
            ->withQueryString();

        $approved = Applicant::with('user')->where('status', 'A')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(6)
            ->withQueryString();

        $rejected = Applicant::with('user')->where('status', 'R')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(6)
            ->withQueryString();

        return Inertia::render('dashboard/applicant/index', [
            'pending' => $pending,
            'approved' => $approved,
            'rejected' => $rejected,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ApplicantRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();

        if ($request->hasFile('path_cv')) {
            $validatedData['path_cv'] = $request->file('path_cv')->store('applicants', 'public');
        }

        Applicant::create($validatedData);

        return redirect()->route('home');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateStatus(Request $request)
    {
        $request->validate([
            'id' => ['required', 'exists:applicants,id'],
            'status' => ['required', 'in:A,R']
        ]);

        $applicant = Applicant::findOrFail($request->id);
        $applicant->status = $request->status;
        $applicant->save();

        return back()->with(
            'toast',
            "Status {$applicant->name} updated to " . ($request->status === 'R' ? 'Rejected' : 'Approved')
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Applicant $applicant)
    {
        if ($applicant->path_cv) {
            Storage::disk('public')->delete($applicant->path_cv);
        }

        $applicant->delete();

        return redirect()->route('dashboard.applicant.index');
    }
}
