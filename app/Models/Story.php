<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Story
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $description
 * @property string|null $cover_image
 * @property string $type
 * @property string $status
 * @property int $author_id
 * @property array|null $genres
 * @property array|null $tags
 * @property float $rating
 * @property int $rating_count
 * @property int $view_count
 * @property int $favorite_count
 * @property bool $is_featured
 * @property bool $is_published
 * @property \Illuminate\Support\Carbon|null $published_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read User $author
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Chapter[] $chapters
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Comment[] $comments
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Favorite[] $favorites
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Rating[] $ratings
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ReadingHistory[] $readingHistory
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Story newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Story newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Story query()
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereAuthorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereCoverImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereFavoriteCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereGenres($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereIsPublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereRatingCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story whereViewCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Story published()
 * @method static \Illuminate\Database\Eloquent\Builder|Story featured()
 * @method static \Illuminate\Database\Eloquent\Builder|Story manga()
 * @method static \Illuminate\Database\Eloquent\Builder|Story novel()
 * @method static \Illuminate\Database\Eloquent\Builder|Story ongoing()
 * @method static \Illuminate\Database\Eloquent\Builder|Story completed()
 * @method static \Database\Factories\StoryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Story extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'cover_image',
        'type',
        'status',
        'author_id',
        'genres',
        'tags',
        'is_featured',
        'is_published',
        'published_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'genres' => 'array',
        'tags' => 'array',
        'rating' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    /**
     * Scope a query to only include published stories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true)->whereNotNull('published_at');
    }

    /**
     * Scope a query to only include featured stories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to only include manga stories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeManga($query)
    {
        return $query->where('type', 'manga');
    }

    /**
     * Scope a query to only include novel stories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeNovel($query)
    {
        return $query->where('type', 'novel');
    }

    /**
     * Scope a query to only include ongoing stories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOngoing($query)
    {
        return $query->where('status', 'ongoing');
    }

    /**
     * Scope a query to only include completed stories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Get the author that owns the story.
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Get the chapters for the story.
     */
    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class)->orderBy('chapter_number');
    }

    /**
     * Get the comments for the story.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->whereNull('parent_id')->latest();
    }

    /**
     * Get the favorites for the story.
     */
    public function favorites(): HasMany
    {
        return $this->hasMany(Favorite::class);
    }

    /**
     * Get the ratings for the story.
     */
    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class);
    }

    /**
     * Get the reading history for the story.
     */
    public function readingHistory(): HasMany
    {
        return $this->hasMany(ReadingHistory::class);
    }

    /**
     * Get the categories for the story.
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'story_categories');
    }
}