use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();    
})

Route::controller(ProductController::class)->group(function () {
    Route::get('/Products', 'index');
    Route::post('/Products', 'store');
    Route::get('/Products/{id}', 'show');
    Route::put('/Products/{id}', 'update');
    Route::delete('/Products/{id}', 'destroy');
});