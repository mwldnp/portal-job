<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home(Request $request)
    {
        $department = $request->input('department');

        $vacancies = Vacancy::with('department')
            ->when($department, function ($query, $department) {
                $query->whereHas('department', function ($q) use ($department) {
                    $q->where('name', $department);
                });
            })
            ->latest()
            ->paginate(6)
            ->withQueryString();

        $departments = Department::all();

        return Inertia::render('home', [
            'vacancies' => $vacancies,
            'departments' => $departments,
            'filters' => $request->only(['department']),
        ]);
    }
}
