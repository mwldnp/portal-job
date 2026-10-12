<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ApplicantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'vacancy_id' => ['required', 'exists:vacancies,id'],
            'name' => ['required', 'max:255', 'string'],
            'gender' => ['required', 'string'],
            'dob' => ['date', 'required'],
            'address' => ['required', 'string', 'max:255'],
            'no_telp' => ['required', 'string', 'max:20'],
            'university' => ['required', 'max:255'],
            'major' => ['required', 'max:255'],
            'ipk' => ['required', 'numeric', 'between:0.00,4.00'],
            'status' => ['string', 'in:P'],
            'path_cv' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:2048']
        ];
    }
}
